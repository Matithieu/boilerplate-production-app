#!/bin/bash
#!/bin/zsh
# On bash run it with ./devcli.sh

# Color codes for styling
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load .env
if [ -f .env ]; then
    set -a
    while IFS='=' read -r key value; do
        if [[ ! $key =~ ^\ *# ]] && [[ -n $key ]]; then
            export "$key=$value"
        fi
    done <.env
    set +a
fi

############################################
#               FUNCTIONS                  #
############################################

# --- help function ---
help() {
    echo -e "${GREEN}Usage: ./devcli.sh [command] [options]${NC}"
    echo ""
    echo "Available commands:"
    echo -e "  ${YELLOW}start {dev|prod}${NC}          Start docker containers for the chosen environment."
    echo -e "  ${YELLOW}stop {dev|prod}${NC}           Stop docker containers for the chosen environment."
    echo -e "  ${YELLOW}install${NC}                   Clone or pull the repositories specified in .env."
    echo -e "  ${YELLOW}remove_volumes {dev|prod}${NC} Remove volumes for the chosen environment."
    echo -e "  ${YELLOW}create_env${NC}                Create .env files from template.env in App-API and App-Front."
    echo -e "  ${YELLOW}init${NC}                     Install repos, create env files, insert DB, and generate certificates."
    echo -e "  ${YELLOW}generate_certificates${NC}     Generate SSL/TLS certificates for local development."
    echo -e "  ${YELLOW}reload {dev|prod} <service>${NC} Zero-downtime reload for a specific service in a chosen environment."
    echo -e "  ${YELLOW}help${NC}                      Show this help message."
    echo ""
}

# Function to generate SSL/TLS certificates and convert to JKS for local development
# Might need to run this script with sudo
generate_certificates() {
    # Variables
    KEYSTORE_PASSWORD="changeit"
    ALIAS="myalias"
    DAYS_VALID=365
    CONFIG_FILE="./config/certs/server.cnf"
    OUTPUT_DIR="./config/certs"

    # Create the output directory if it doesn't exist
    mkdir -p "$OUTPUT_DIR"

    # Create the configuration file
    cat >"$CONFIG_FILE" <<EOL
[ req ]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[ req_distinguished_name ]
C = FR
ST = State
L = Paris
O = matithieu
OU = OrganizationalUnit
CN = matithieu.com

[ v3_req ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = matithieu.com
DNS.2 = www.matithieu.com
DNS.3 = keycloak
EOL

    # Private Key And CSR
    openssl req -newkey rsa:2048 -nodes -keyout "$OUTPUT_DIR/server.key" -out "$OUTPUT_DIR/server.csr" -config "$CONFIG_FILE"

    # CSR -> CRT
    openssl x509 -req -days "$DAYS_VALID" -in "$OUTPUT_DIR/server.csr" -signkey "$OUTPUT_DIR/server.key" -out "$OUTPUT_DIR/server.crt" -extensions v3_req -extfile "$CONFIG_FILE"

    # Key -> PKCS12
    openssl pkcs12 -export -in "$OUTPUT_DIR/server.crt" -inkey "$OUTPUT_DIR/server.key" -out "$OUTPUT_DIR/server.p12" -name "$ALIAS" -passout pass:"$KEYSTORE_PASSWORD"

    # PKCS12 -> JKS
    keytool -importkeystore -deststorepass "$KEYSTORE_PASSWORD" -destkeypass "$KEYSTORE_PASSWORD" -destkeystore "$OUTPUT_DIR/keystore.jks" -srckeystore "$OUTPUT_DIR/server.p12" -srcstoretype PKCS12 -srcstorepass "$KEYSTORE_PASSWORD" -alias "$ALIAS" -noprompt

    # Combine the CRT and KEY into a PEM file
    cat "$OUTPUT_DIR/server.crt" "$OUTPUT_DIR/server.key" >"$OUTPUT_DIR/server.pem"

    # Give the correct permissions to the files
    chmod 644 "$OUTPUT_DIR/server.crt" "$OUTPUT_DIR/server.key" "$OUTPUT_DIR/server.pem" "$OUTPUT_DIR/server.p12"

    echo -e "${GREEN}SSL/TLS certificates generated successfully!${NC}"
}

# Function to start docker containers
start() {
    if [ -z "$1" ]; then
        echo -e "${RED}No environment specified. Please use 'dev' or 'prod'.${NC}"
        exit 1
    fi

    echo "Starting docker containers..."
    if [ "$1" = "dev" ] || [ "$1" = "prod" ]; then
        if docker compose -f "docker-compose-$1.yml" up --build; then
            echo -e "${GREEN}Containers are up!${NC}"
        else
            echo -e "${RED}Failed to start docker containers.${NC}"
            exit 1
        fi
    fi
}

# Function to stop docker containers
stop() {
    if [ -z "$1" ]; then
        echo -e "${RED}No environment specified. Please use 'dev' or 'prod'.${NC}"
        exit 1
    fi

    echo "Stopping docker containers..."
    if docker compose -f "docker-compose-$1.yml" down; then
        echo -e "${GREEN}Containers are down!${NC}"
    else
        echo -e "${RED}Failed to stop docker containers.${NC}"
        exit 1
    fi
}

# Function to validate a repository URL
validate_repo() {
    REPO_URL="$1"

    if git ls-remote "$REPO_URL" &>/dev/null; then
        echo -e "${GREEN}Repository $REPO_URL is valid.${NC}"
        return 0
    else
        echo -e "${RED}Repository $REPO_URL is invalid or inaccessible.${NC}"
        return 1
    fi
}

# Function to remove volumes
remove_volumes() {
    echo "Removing volumes for $1 environment..."
    if docker compose -f "docker-compose-$1.yml" down -v; then
        echo -e "${GREEN}Volumes removed for $1 environment!${NC}"
    else
        echo -e "${RED}Failed to remove volumes for $1 environment.${NC}"
        exit 1
    fi
}

# Function to clone or update a repository
clone_or_update_repo() {
    REPO_URL="$1"
    REPO_DIR="$2"

    if [ ! -d "$REPO_DIR" ]; then
        echo "Cloning $REPO_URL into $REPO_DIR"
        if git clone "$REPO_URL" "$REPO_DIR"; then
            echo -e "${GREEN}Cloned $REPO_URL successfully.${NC}"
        else
            echo -e "${RED}Failed to clone $REPO_URL${NC}"
            exit 1
        fi
    else
        echo "Updating $REPO_DIR"
        cd "$REPO_DIR" || {
            echo -e "${RED}Failed to enter $REPO_DIR directory.${NC}"
            exit 1
        }
        if git pull; then
            echo -e "${GREEN}Updated $REPO_DIR successfully.${NC}"
        else
            echo -e "${RED}Failed to update $REPO_DIR${NC}"
            exit 1
        fi
        cd ..
    fi
}

# Function to install repositories from GitHub
install() {
    echo "Fetching repositories from GitHub..."

    REPO1_URL="${REPO1}"
    REPO2_URL="${REPO2}"

    clone_or_update_repo "$REPO1_URL" "App-API"
    clone_or_update_repo "$REPO2_URL" "App-Front"

    echo -e "${GREEN}Repositories are up-to-date!${NC}"
}

# Function to create .env files from .template.env files
create_env() {
    for dir in App-API App-Front; do
        TEMPLATE_FILE="$dir/template.env"
        ENV_FILE="$dir/.env"
        if [ -f "$TEMPLATE_FILE" ]; then
            cp "$TEMPLATE_FILE" "$ENV_FILE"
            echo -e "${GREEN}Created .env file in $dir from $TEMPLATE_FILE.${NC}"
        else
            echo -e "${RED}$TEMPLATE_FILE not found in $dir.${NC}"
            exit 1
        fi
    done
}

# Dummy function to show how you might insert a DB if needed (not defined in original script)
insert_db() {
    # Example placeholder function
    echo "Inserting DB placeholder for $1..."
}

# Function to initialize the environment
init() {
    echo "Initializing the environment..."
    install
    create_env
    insert_db "template"
    generate_certificates
    echo -e "${GREEN}Environment initialized successfully!${NC}"
}

# Function to reload a specific service container (zero downtime)
reload() {
    # $1 -> environment (dev|prod), $2 -> service name
    ENV="$1"
    SERVICE="$2"

    echo "Building the Docker image for $SERVICE..."
    if docker compose -f "docker-compose-$ENV.yml" build "$SERVICE"; then
        echo -e "${GREEN}Docker image built successfully.${NC}"
    else
        echo -e "${RED}Failed to build Docker image.${NC}"
        exit 1
    fi

    echo "Starting a new instance of $SERVICE container with the updated image..."
    if docker compose -f "docker-compose-$ENV.yml" up -d --scale "$SERVICE"=2 --no-recreate; then
        echo -e "${GREEN}New instance of $SERVICE started successfully!${NC}"
    else
        echo -e "${RED}Failed to start a new instance of $SERVICE.${NC}"
        exit 1
    fi

    echo "Waiting for the new container to stabilize..."
    if [ "$ENV" = "prod" ]; then
        sleep 30
    else
        sleep 10
    fi

    echo "Stopping the old $SERVICE container..."
    if docker compose -f "docker-compose-$ENV.yml" up -d --scale "$SERVICE"=1; then
        echo -e "${GREEN}Old instance of $SERVICE stopped successfully.${NC}"
    else
        echo -e "${RED}Failed to stop the old instance of $SERVICE.${NC}"
        exit 1
    fi

    echo "Reload of $SERVICE completed with zero downtime!"
}

############################################
#               MAIN CASE                  #
############################################

# If no arguments or "help" is passed, show help and exit
if [ "$#" -lt 1 ] || [ "$1" = "help" ]; then
    help
    exit 0
fi

case "$1" in
    start)
        # Usage: ./devcli.sh start dev|prod
        if [ "$2" = "dev" ] || [ "$2" = "prod" ]; then
            start "$2"
        else
            echo -e "${YELLOW}Usage: ./devcli.sh start {dev|prod}${NC}"
            exit 1
        fi
        ;;
    stop)
        # Usage: ./devcli.sh stop dev|prod
        if [ "$2" = "dev" ] || [ "$2" = "prod" ]; then
            stop "$2"
        else
            echo -e "${YELLOW}Usage: ./devcli.sh stop {dev|prod}${NC}"
            exit 1
        fi
        ;;
    install)
        install
        ;;
    remove_volumes)
        # Usage: ./devcli.sh remove_volumes dev|prod
        if [ "$2" = "dev" ] || [ "$2" = "prod" ]; then
            remove_volumes "$2"
        else
            echo -e "${YELLOW}Usage: ./devcli.sh remove_volumes {dev|prod}${NC}"
            exit 1
        fi
        ;;
    create_env)
        create_env
        ;;
    init)
        init
        ;;
    generate_certificates)
        generate_certificates
        ;;
    reload)
        # Usage: ./devcli.sh reload dev|prod serviceName
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${RED}Usage: ./devcli.sh reload {dev|prod} <service-name>${NC}"
            exit 1
        fi
        if [ "$2" = "dev" ] || [ "$2" = "prod" ]; then
            reload "$2" "$3"
        else
            echo -e "${RED}Error: Environment not specified or invalid. Use 'dev' or 'prod'.${NC}"
            exit 1
        fi
        ;;
    *)
        # If command doesn't match any of the above, show help.
        help
        exit 1
        ;;
esac

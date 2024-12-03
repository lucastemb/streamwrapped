#!/bin/bash

# Get the terminal type
TERM_TYPE=$(basename "$TERM")

# Define the commands for each terminal
COMMAND1="pip install flask python-steam-api python-dotenv pymongo && python Backend/src/infrastructure.py"
COMMAND2="cd Backend && npm install nodemon && npm install cors && npm install mongodb && npm install dotenv && npm run dev"
COMMAND3="cd frontend/client && npm install next@latest react@latest react-dom@latest @react-oauth/google && npm install jwt-decode && npm install axios && npm run dev"
echo "$TERM_TYPE"
case "$TERM_TYPE" in
    gnome-terminal)
        gnome-terminal --tab -- bash -c "$COMMAND1; exec bash" \
                       --tab -- bash -c "$COMMAND2; exec bash" \
                       --tab -- bash -c "$COMMAND3; exec bash"
        ;;
    konsole)
        konsole --new-tab -e bash -c "$COMMAND1; exec bash" \
                --new-tab -e bash -c "$COMMAND2; exec bash" \
                --new-tab -e bash -c "$COMMAND3; exec bash"
        ;;
    xfce4-terminal)
        xfce4-terminal --tab -e "bash -c '$COMMAND1; exec bash'" \
                       --tab -e "bash -c '$COMMAND2; exec bash'" \
                       --tab -e "bash -c '$COMMAND3; exec bash'"
        ;;
    xterm-kitty|kitty)
        kitty @ launch --type tab --title "python script" --cwd current -- bash -c "$COMMAND1; exec bash"
        kitty @ launch --type tab --title "node backend" --cwd current -- bash -c "$COMMAND2; exec bash"
        kitty @ launch --type tab --title "node frontend" --cwd current -- bash -c "cd ..; $COMMAND3; exec bash"
        ;;
    *)
        echo "Unsupported terminal emulator: $TERM_TYPE"
        ;;
esac

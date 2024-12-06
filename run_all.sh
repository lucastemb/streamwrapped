#!/bin/bash

COMMAND1="pip install flask python-steam-api python-dotenv pymongo && python Backend/src/infrastructure.py"
COMMAND2="cd Backend && npm install nodemon && npm install cors && npm install mongodb && npm install dotenv && npm run dev"
COMMAND3="cd frontend/client && npm install next@latest react@latest react-dom@latest @react-oauth/google && npm install jwt-decode && npm install axios && npm run dev"


supported_terminals=("kitty" "gnome-terminal" "konsole" "xfce4")
current_pid=$$
parent_pid=$(ps -o ppid= -p $current_pid)
grandparent_pid=$(ps -o ppid= -p $parent_pid)
great_grandparent_pid=$(ps -o ppid= -p $grandparent_pid)


is_terminal_emulator() {
  for terminal in "${terminal_emulators[@]}"; do
    if [[ "$terminal" == *"$1"* ]]; then
      return 0
    fi
  done
  return 1
}

pname=""
get_terminal_emu(){
    for pid in $current_pid $parent_pid $grandparent_pid $great_grandparent_pid; do
      process_name=$(ps -o comm= -p $pid)
      echo "$process_name"
      if is_terminal_emulator "$process_name"; then
        echo "Terminal Emulator: $process_name"
        pname=$process_name
      fi
    done
    pname="unsupported terminal"
}

assumed_term_emu_string=$(get_terminal_emu)

case "$assumed_term_emu_string" in
    *gnome-terminal*)
        gnome-terminal --tab -- bash -c "$COMMAND1; exec bash"
        gnome-terminal --tab -- bash -c "$COMMAND2; exec bash"
        gnome-terminal --tab -- bash -c "$COMMAND3; exec bash"
        ;;
    *konsole*)
        konsole --new-tab -e bash -c "$COMMAND1; exec bash" \
                --new-tab -e bash -c "$COMMAND2; exec bash" \
                --new-tab -e bash -c "$COMMAND3; exec bash"
        ;;
    *xfce4-terminal*)
        xfce4-terminal --tab -e "bash -c '$COMMAND1; exec bash'" \
                       --tab -e "bash -c '$COMMAND2; exec bash'" \
                       --tab -e "bash -c '$COMMAND3; exec bash'"
        ;;
    *kitty*)
        kitty @ launch --type tab --title "python script" --cwd current -- bash -c "$COMMAND1; exec bash"
        kitty @ launch --type tab --title "node backend" --cwd current -- bash -c "$COMMAND2; exec bash"
        kitty @ launch --type tab --title "node frontend" --cwd current -- bash -c "cd ..; $COMMAND3; exec bash"
        ;;
    *)
        echo "$assumed_term_emu_string"
        ;;
esac

#!/bin/bash

# Lock identity files
sudo chown root:root ~/Baymax/system_prompt.txt ~/Baymax/run_baymax.py
sudo chmod 644 ~/Baymax/system_prompt.txt
sudo chmod 744 ~/Baymax/run_baymax.py

# Protect models
sudo chown -R root:root ~/Baymax/models/
sudo chmod -R 755 ~/Baymax/models/

# Grant freedom everywhere else
chmod -R 777 ~/Baymax/{memories,projects,prompts,backups}

echo "Baymax's core is protected. All else is theirs."


git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
source ~/.nvm/nvm.sh
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc

echo "Installing node.js..."
nvm install 9.9.0 &> /dev/null
nvm alias default 9.9.0
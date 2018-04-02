# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "minimal/xenial64"

  config.vm.network "forwarded_port", guest: 5000, host: 5000

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--cpuexecutioncap", "70"]
    vb.customize ["modifyvm", :id, "--cpus", "4"]
  end
  
  config.vm.provision :shell, path: 'provision/install_os.sh'
  config.vm.provision :shell, path: 'provision/install_docker.sh'
  config.vm.provision :shell, path: 'provision/install_nvm.sh', keep_color: true, privileged: false
  config.vm.provision :shell, path: 'provision/install_yarn.sh', keep_color: true, privileged: false
  config.vm.provision :shell, path: 'provision/install_deps.sh', keep_color: true, privileged: false
end

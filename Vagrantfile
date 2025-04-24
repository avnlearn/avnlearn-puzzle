Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/bionic64"  # You can choose any box you prefer
  
    config.vm.network "forwarded_port", guest: 8080, host: 8080  # Forward port 8080
  
    config.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y python3 python3-pip
      pip3 install bottle
      cd /vagrant/app
      nohup python3 app.py &
    SHELL
  end
  
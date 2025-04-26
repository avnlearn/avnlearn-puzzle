Vagrant.configure("2") do |config|
  # Use the Ubuntu 18.04 (Bionic Beaver) base box
  config.vm.box = "ubuntu/bionic64"

  # Sync the project directory to a specific location in the guest
  config.vm.synced_folder ".", "/home/vagrant/my-github-page"

  # Forward the port for Jekyll
  config.vm.network "forwarded_port", guest: 4000, host: 4000

  # Provision the VM with necessary packages
  config.vm.provision "shell", inline: <<-SHELL
    set -e  # Exit immediately if a command exits with a non-zero status

    # Update and upgrade the system
    apt-get update
    apt-get upgrade -y

    # Install necessary packages
    apt-get install -y software-properties-common

    # Add the Brightbox PPA for Ruby
    apt-add-repository -y ppa:brightbox/ruby-ng

    # Update package list and install Ruby
    apt-get update
    apt-get install -y ruby3.1 ruby3.1-dev

    # Install Bundler
    gem install bundler

    # Install Jekyll
    gem install jekyll

    # Clean up to save space
    apt-get clean
    rm -rf /var/lib/apt/lists/*
  SHELL

  # Optional: Install additional dependencies from a Gemfile if present
  config.vm.provision "shell", inline: <<-SHELL
    if [ -f /home/vagrant/my-github-page/Gemfile ]; then
      cd /home/vagrant/my-github-page
      bundle install
    fi
  SHELL

  # Start the Jekyll server automatically
  config.vm.provision "shell", inline: <<-SHELL
    cd /home/vagrant/my-github-page
    nohup bundle exec jekyll serve --host 0.0.0.0 --port 4000 > /home/vagrant/jekyll.log 2>&1 &
  SHELL
end

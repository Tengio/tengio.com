+++
id = "0003"
date = "2016-08-12T11:00:58+05:30"
modified = "2016-08-16T17:25:58+05:30"
title = "Getting caffe for ai working on Linux"
description = "The following tutorial/instruction set is to break down the arduous task of installing Caffe into a set of clear and simple instructions. If you've tried to install Caffe before, it is no secret that it can be a tricky task. While there are plenty of answers online for individual problems, I've rarely come across a single comprehensive guide to getting Caffe to successfully run on Ubuntu 14.04, utilising all the necessary..."
author = "shreyas"
tags = [ "AI" ]
+++

## Introduction

The following tutorial/instruction set is to break down the arduous task of installing Caffe into a set of clear and simple instructions. If you've tried to install Caffe before, it is no secret that it can be a tricky task. While there are plenty of answers online for individual problems, I've rarely come across a single comprehensive guide to getting Caffe to successfully run on Ubuntu 14.04, utilising all the necessary libraries for a PASCAL GPU (here: Nvidia GTX1070) capability and the various interfaces available.

I have compiled these instructions during the many hours I spent trying to install the following pieces of code correctly. This instruction set was based off of one created by my friend Steven Chen to help those such as myself get Caffe up and running quickly. This guide however will deal with some of the minor hiccups along the way, specially considering that the PASCAL GPUs are somewhat new to the market, along with CUDA 8.0. This tutorial should have you training and testing models as soon as possible!

For a more detailed list of my setup, here is my build: [PC PartPicker List](http://pcpartpicker.com/list/Rc4YTH)

What is [Caffe](http://caffe.berkeleyvision.org/)?

 >Caffe is a deep learning framework made with expression, speed, and modularity in mind. It is developed by the Berkeley Vision and Learning Center (BVLC) and by community contributors. Yangqing Jia created the project during his PhD at UC Berkeley. Caffe is released under the BSD 2-Clause license.

I hope this guide will be of help to you, and if you have any questions, feel free to reach out via e-mail.

**NOTE**: I recomend installing CUDA via the Runfile package, as I have tested the method suggested below on multiple computers.

## Installing Ubuntu

1. Create bootable thumb drive or USB
Go to BIOS and rearrange boot settings to place liveUSB or liveCD to highest preference

2. Reboot your computer and when you reach the GRUB options, highlight Install Ubuntu and hit 'e'
Replace the 'quiet splash' string with 'nomodeset'

3. Reboot and select Install Ubuntu option from GRUB menu
Follow installation - Erase Ubuntu 14.04.4 LTS and reinstall
Reboot and go to BIOS and rearrange the boot order to push back the liveUSB / liveCD lower in order

4. Reboot and hit ESC before login to into GRUB
Highlight Ubuntu and hit 'e' again and replace 'quiet splash' string with 'nomodeset'
Reboot and you should be able to login

## Verification of GPU Compatibility

1. Verify that your GPU is CUDA compatible
```
$ lspci | grep -i nvidia
```

2. Verify that your version of linux is CUDA compatible
```
$ uname -m && cat /etc/*release
```
(x86_64 should confirm that you are running a 64bit OS)

3. Verify that you have GCC installed
```
$ gcc --version
```
If you don't have GCC installed, you need to download an appropriate version or install it from the development tools

4. Check the version of the kernel that your system is running
```
$ uname -r
```

5. The kernel headers and development packages for the currently running kernel can be installed
```
$ sudo apt-get install linux-headers-$(uname -r)
```

## Installing CUDA via Debian Package

1. To install debian package for CUDA
```
$ `sudo dpkg -i cuda-repo-ubuntu1404-8-0-rc_8.0.27-1_amd64-deb`
$ `sudo apt-get update`
$ `sudo apt-get install cuda`
```

2. Reboot the system to load the NVIDIA drivers

3. Set up the development environment by modifiying the PATH and LD_LIBRARY_PATH environment variables
```
$ export PATH=/usr/local/cuda-8.0/bin${PATH:+:${PATH}}
$ export LD_LIBRARY_PATH=/usr/local/cuda-8.0/lib64\
${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```
NOTE: If exporting to .bashrc profile doesn't work, open ~/.bashrc file and add these lines manually
To find the .bashrc file:
```
$ cd /home
$ ls -la ~/ | more
```
If you cannot find a .bashrc file, create it using
```
$ vi ~/.bashrc
```
Most of the distributions keep a .bashrc file in /etc/skel/
Copy it into your home directory using
```
$ cp /etc/skel/.bashrc ~
```

4. Install samples
```
$ cuda-install-samples-8.0.sh ~
$ cd ~/NVIDIA_CUDA-8.0_Samples/5_Simulations/nbody
$ make
$ ./nbody
```

## Installing CUDA via RUN FILE

1. Disable Nouveau drivers. Create a file blacklist-nouveau.conf at /etc/modprobe.d/blacklist-nouveau.conf with the following contents
```
blacklist nouveau
options nouveau modeset=0
```
Regenerate the kernel initramfs
```
$ sudo update-initramfs -u
```

2. Reboot into runlevel 3 by temporarily adding the number "3" and the word "nomodeset" to the end of the system's kernel boot parameters.
```
$ cd /etc/default
$ sudo gedit grub
```
Set the variable GRUB_CMDLINE_LINUX="3"
(Once you're done installing CUDA, change this back to "" and update-grub again)
```
$ sudo update-grub
```

3. Run installer with implied acceptance of EULA
```
$ `sudo sh cuda_8.0.27_linux.run --silent`
```
(I ran it without the silent tag and said NO to installing the driver that comes with CUDA 8.0 and chose to install the driver myself)

4. Install the required NVIDIA driver

5. Create an xorg.conf file to use the NVIDIA GPU for display
```
$ sudo nvidia-xconfig
```

6. Reboot the system

7. Set up the development environment by modifiying the PATH and LD_LIBRARY_PATH environment variables
```
$ export PATH=/usr/local/cuda-8.0/bin${PATH:+:${PATH}}
$ export LD_LIBRARY_PATH=/usr/local/cuda-8.0/lib64\
${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```
NOTE: Test the GPU cards to see if the drivers are working correctly
```
$ cat /proc/driver/nvidia/version
```
Check the version of the CUDA compiler
```
$ nvcc -V
```

8. Install GCC using
```
$ sudo apt-get --yes install build-essential
```

9. Install samples
```
$ cuda-install-samples-8.0.sh ~
$ cd ~/NVIDIA_CUDA-8.0_Samples/5_Simulations/nbody
$ make
$ ./nbody
```

## Installing CuDNN v5 for CUDA 8.0

1. Download the CuDNN files from NVIDIA

2. Extract all files (I extracted them to my Downloads folder)

3. Verify the folder in which your CUDA installation occured using the following commands:
```
$ which nvcc
```
or,
```
$ ldconfig -p | grep cuda
```

4. Open the contents of your extracted files, it should contain a folder 'cuda' with two subfolders 'include' and 'lib64'. Move these contents to their respective cuda folders as follows.
```
$ sudo cp -P ~/Downloads/cuda/include/cudnn.h /usr/local/cuda/include
$ sudo cp -P ~/Downloads/cuda/lib64/* /usr/local/cuda/lib64
$ sudo chmod a+r /usr/local/cuda/lib64/libcudnn*
```
I haven't figured out how to actually verify the successful installation of CuDNN without installing one of the machine learning frameworks (Caffe, TensorFlow etc.) so we'll have to wait till one of them are successfully installed to verify this.

## Installing Caffe

1. Install recommended dependencies
```
$ sudo apt-get install libprotobuf-dev libleveldb-dev libsnappy-dev libopencv-dev libhdf5-serial-dev protobuf-compiler
$ sudo apt-get install --no-install-recommends libboost-all-dev
```

2. Install BLAS
```
$ sudo apt-get install libatlas-base-dev
```

3. Install the rest of the dependencies
```
$ sudo apt-get install libgflags-dev libgoogle-glog-dev liblmdb-dev
```

4. Pull the latest git repository for the Caffe build
```
$ sudo apt-get install git
$ cd /Home (I chose to place the caffe repository in my Home folder)
$ git clone git//github.com/BVLC/git
```

5. Compile caffe
```
$ cd /path/to/caffe
$ make all -jx (runs on x different CPU threads: Adjust the value of x as desired)
$ make test
$ make runtest
```
Refer to the 'Debugging Common Errors' section below if you enounter a missing shared libraries error.
If you followed all the above steps correctly, your runtest should have successfully passed all the tests and you should see a result similar to this.

![article-img](/img/blog/0003/caffe-screenshot.jpg)

## Installing Python Interface

While Linux comes with a system distribution of Python (2.7.x), it is advisable to avoid using this and create virtual environments with independent python distributions such that you can organise your dependencies within confined spaces. I've tried this installation using PIP and followed the suggested steps mentioned on the Caffe website and I have got the python interface to work successfully, but with this installation of Caffe I decided to try Anaconda and it's vast math and science libraries.

1. Download the Anaconda Installer from HERE

2. Install

```
$ cd ~/Downloads
$ bash Anaconda2-4.1.1-Linux-x86_64.sh
```

Note down the location of your Anaconda installation. I installed anaconda to my $(HOME), in the same folder as Caffe.

3. Create a virtual environment for all your Caffe processes

```
$ conda create -name caffe_env numpy=1.10.2
```

You can enter your virtual environment by simply typing in the following activation command

```
$ source activate caffe_env
```

You will notice a prefixed (caffe_env) to your prompt. This indicates that you are inside your environment
To deactivate the virtual environment, use the following command

```
$ source deactivate
```

But we will continue the following steps inside the virtual environment

```
$ source activate caffe_env
```

Check if your virtual environment contains all the dependencies for Caffe

```
$ conda list
```
If you can see all the dependencies here, you're ready to go

4. Build Caffe once again

```
$ make clean
$ make all -j
$ make test -j
$ make runtest
$ make pycaffe
```

If you've gotten here so far without errors, you've successfully installed Caffe with a python interface.

5. Testing
Close all your terminal windows and open up a new window.

```
$ python
>>> import caffe
```

This should work without any errors!

### Debugging Common Errors

1. Error while loading shared libraries: libcudart.so.4: cannot open shared object file: No such file or directory
```
$ export LD_LIBRARY_PATH=/usr/local/cuda-8.0/lib\ ${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```
or,
```
$ sudo ldconfig usr/local/cuda/lib64
```

2. CURAND_STATUS_LAUNCH_FAILURE
If you're running an NVIDIA GTX PASCAL card on CUDA 7.5 -> switch to CUDA 8.0.

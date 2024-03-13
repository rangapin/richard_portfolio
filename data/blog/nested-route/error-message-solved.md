---
title: List of error messages I solved
date: '2023-12-30'
tags: ['error', 'message', 'google']
draft: false
summary: This is a list of error messages I solved
---

## libpcre3-dev : Depends: libpcre3 (= 2:8.39-13ubuntu0.22.04.1) but 2:8.44-2+ubuntu20.10.1+deb.sury.org+1 is to be installed E: Unable to correct problems, you have held broken packages.

Thank you Github! I solved this issue by downgrading the package using the command.

```
sudo apt-get install libpcre3=2:8.39-13ubuntu0.22.04.1
```

## WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!

IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:uNiVztksCsDhcc0u9e8BujQXVUpKZIDTMczCvj3tD2s.
Please contact your system administrator.
Add correct host key in /home/richard/.ssh/known_hosts to get rid of this message.
Offending RSA key in /home/richard/.ssh/known_hosts:1
remove with:
ssh-keygen -f "/home/richard/.ssh/known_hosts" -R "github.com"
Host key for github.com has changed and you have requested strict checking.
Host key verification failed.
fatal: Could not read from remote repository.

Thank you Google! I solved this issue by copy/pasting my Github SSH Key into .ssh/known_hosts

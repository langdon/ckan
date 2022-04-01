# Special Settings for BU-Spark!

1. see credentials in bitwarden
2. install:
  * docker
  * docker-compose
3. configure docker to use a different directory with:

```bash
$ vi /lib/systemd/system/docker.service

ExecStart=/usr/bin/dockerd -g /mnt/data/docker -H fd:// --containerd=/run/containerd/containerd.sock

```


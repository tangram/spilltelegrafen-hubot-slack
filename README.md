# Spilltelegrafen Slack assistant

Hubot Slack assistant for Spilltelegrafen.

Add new scripts to `src/`. Add their name to `hubot-scripts.js`.

## Prerequisites

You need Node.js and npm to build scripts and Ansible for deployment.

## Build

Some scripts may be written in ES2015 syntax. To build them:

    $ gulp build

## Deploy

To provision an EC2 server, ensure you have ssh access, then run e.g.

    $ ansible-playbook deploy.yml -i <host>, --extra-vars 'slack_token=<slack token>'

Extra variable `slack_token` is only necessary when setting up configuration for supervisor.

To deploy an update, run with just the tags you need:

    $ ansible-playbook deploy.yml -i <host>, -t sync

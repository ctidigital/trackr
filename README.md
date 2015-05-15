# trackr
Trackr uses [Ionic Framework](http://ionicframework.com) to provide a cross platform application that integrates with JIRA and Tempo to provide issue tracking and time management on the go.

## Whose this for?
Anyone who uses JIRA to manage AGILE projects and needs access to projects and issues on the go.

## Setting up the project
You will need to update `ionic.project` to include the url of your JIRA api so `Ionic Serve` can proxy to it on `http://localhost:8100`. You will also need to update the values inside `env/production.json.dist` and rename it to `env/production.json`

### Building the project for devices
You will need to run `gulp production` before running any of the `ionic build <platform>` commands.

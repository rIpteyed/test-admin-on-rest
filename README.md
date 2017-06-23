# Facility Admin Portal

[This project was bootstrapped with the Create React App](docs/create_react_app.md)

<b>Getting Started with IMYourDoc Web App</b>

<h2>Requirments </h2>
<ul>
	<li>Node v6.0.0 or later</li>
	<li>SSL certs (self signed-OK for development, see https://nodejs.org/api/tls.htmlhttps://nodejs.org/api/tls.html)</li>
	<li>For cookies to work, either deploy on an imyourdoc.com server or create a `me.imyourdoc.com 127.0.0.1` host file entry for your local machine so that you can access your local machine at that imyourdoc.com URL</li>
</ul>

### Install node modules at root of app
```bash
npm install
```
### Build app (from IMYourDoc_WebApp directory)
```bash
npm run dev

# Note you can also use:
# npm run qa
# npm run prod
```

Committing your changes
-----------------------

When your modifications are ready (meaning they build successfully and all automated tests pass), commit the changes to this repository.
The steps are:

1. `git add` the changed files that should be included in the commit.

2. `git commit` Enter a brief commit message that explains your changes. You can mark the related Pivotal story as "Finished" by including the text
```
[Finishes #PIVOTAL\_STORY\_ID]
```
in your commit message.
This saves you time, keeps our list of in-progress Pivotal stories short, and has the added benefit of recording which git commit relates to which Pivotal stories.  If your commit doesn't quite finish the Pivotal story (maybe there are dependent changes in other projects) you should still relate your commit to the Pivotal story it implements like this:
```
[#PIVOTAL\_STORY\_ID]
```

3. `git push` your commit up to Github and smile!

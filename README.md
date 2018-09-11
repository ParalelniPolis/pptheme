# Wordpress Theme for paralelnipolis.cz

## Wordpress Dependencies

- Latest 'Timber' Wordpress plugin
- Latest 'Toolset Types' Wordpress plugin

## Building a Theme

Run these commands in root folder of theme:

```
npm install -g gulp
npm install
gulp build
composer install --no-dev
```

Now all necessary files should be built inside the 'dist' folder and all libraries downloaded to the 'vendor' folder.

Note: All changes should be made on files in 'src' folder and then built, build process overwrites all files in 'dist' folder.

# Wordpress Theme for paralelnipolis.cz

## Wordpress Dependencies

- Latest 'Timber' Wordpress plugin (see componser.json)

## Building a Theme

Run these commands in root folder of theme:

```
npm install -g gulp
npm install
gulp build
```

Now all necessary files should be builded inside the 'dist' folder.

Note: All changes should be made on files in 'src' folder and then builded, build process overwrites all files in 'dist' folder.

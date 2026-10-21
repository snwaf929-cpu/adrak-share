# Adrak share page

Share links from [Adrak](https://github.com/snwaf929-cpu/adrak-releases), a learning app, open here:
https://snwaf929-cpu.github.io/adrak-share/

A share link holds the share itself after the `#` (the share's JSON, compressed with zlib, in base64url). Browsers never
send what follows a `#`, so a share reaches no server: this page reads it in the browser, shows what is inside (and any
summaries, to read), and offers it as a `.adrak` file to open in Adrak. The page loads nothing from anywhere else and
sends nothing anywhere.

This repository is published from `web/share` in Adrak's source by `tools/publish-share-page.ps1`; changes go there.

---

روابط المشاركات من أدراك تنفتح هنا. المشاركة نفسها داخل الرابط (بعد علامة #)، والمتصفح ما يرسل هالجزء لأي سيرفر:
هالصفحة تقراها في متصفحك، وتوريك وش فيها، وتعطيك ملف .adrak تفتحه في أدراك.

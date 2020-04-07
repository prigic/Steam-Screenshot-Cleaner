# Steam Screenshot Cleaner
> Delete all your Steam Profile screenshots with the click of a button!

[![License: MIT](https://img.shields.io/badge/Lecense-MIT%202.0-blue.svg)](https://github.com/prigic/Steam-Screenshot-Cleaner/blob/master/LICENSE)

## How to use?
- First, login to your Steam account to remove all screenshots!
- Second, go to the screenshot page!
- Third, press F12 to open the Developer tool!
- Fourth, go to the Console tab in Developer Tools!
- Fifth, Copy and paste all of the script below into the console and press Enter!
- Sixth, press the Manage screenshots button and then the ⚠️All Delete⚠️ button!
- Seventh, wait until all screenshots are deleted!

## Minify script
```
var interval=1e3;function setHTML(e){var t=jQuery("#loadingPageModal");t.show(),t.find(".imgWallLoadingPageModal").css("height","auto").html(`<div><img src="https://steamcommunity-a.akamaihd.net/public/images/login/throbber.gif"></img>${e}</div><div>⚠️All work is done automatically. Don't do anything else until the work is done.⚠️</div>`)}function deleteRun(){var e={},t={action:"delete",sessionid:sessionID};jQuery(".imgWallHover").each(function(t,n){var o=(n=jQuery(n)).attr("id").replace("imgWallHover","");console.log(o),e["screenshots["+Number(o)+"]"]="on"}),t=Object.assign(t,e);var n=setInterval(function(){getScreenShot(function(e){setHTML("Deleting all screenshots! ("+e+" left)")})},1e3);jQuery.ajax({url:window.location.href,data:t,method:"post",complete:function(e){clearInterval(n),setHTML("Delete all screenshots!"),alert("Delete all screenshots!"),window.location.href=window.location.href}})}function onSuccess(){setHTML("Requesting server..."),deleteRun()}function getScreenShot(e){jQuery.ajax({url:window.location.href.replace("/screenshots",""),method:"get",dataType:"html",complete:function(t){try{var n=jQuery(t.responseText).find(".profile_item_links").children().eq(2).find(".profile_count_link_total").text().trim();e(n)}catch(t){e("unknown")}}})}jQuery.fn.center=function(){return this.css("position","absolute"),this.css("top",Math.max(0,(jQuery(window).height()-jQuery(this).outerHeight())/2+jQuery(window).scrollTop())+"px"),this.css("left",Math.max(0,(jQuery(window).width()-jQuery(this).outerWidth())/2+jQuery(window).scrollLeft())+"px"),this},jQuery("#button_submit_manage").after('<a class="ScreenshotManagementButton" id="button_del_all" href="javascript:;" style="margin-left: 5px;">⚠️All Delete⚠️</a>'),jQuery("#button_del_all").click(function(){if(confirm("Press OK to delete all screenshots from that profile!")){setHTML("Loading all screenshots...");var e=jQuery(document),t=0,n=setInterval(function(){e.scrollTop(e.height()),jQuery("#loadingPageModal").center()},100),o=setInterval(function(){t===e.scrollTop()?(clearInterval(o),clearInterval(n),onSuccess()):t=e.scrollTop()},3e3)}});
```

## Screentshot
![screenshot](/assets/screenshot.png)

## License
MIT License

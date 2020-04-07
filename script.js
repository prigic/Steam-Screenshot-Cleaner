var interval = 1000;

jQuery.fn.center = function() {
  this.css("position", "absolute");
  this.css("top", Math.max(0, ((jQuery(window).height() - jQuery(this).outerHeight()) / 2) + jQuery(window).scrollTop()) + "px");
  this.css("left", Math.max(0, ((jQuery(window).width() - jQuery(this).outerWidth()) / 2) + jQuery(window).scrollLeft()) + "px");
  return this;
}

jQuery("#button_submit_manage")
  .after(`<a class="ScreenshotManagementButton" id="button_del_all" href="javascript:;" style="margin-left: 5px;">⚠️All Delete⚠️</a>`);
jQuery("#button_del_all")
  .click(function() {
    if (!confirm("Press OK to delete all screenshots from that profile!")) return;

    setHTML("Loading all screenshots...");

    var Jdoc = jQuery(document);
    var lastPagePos = 0;

    var scrollBottom = setInterval(function() {
      Jdoc.scrollTop(Jdoc.height());

      jQuery("#loadingPageModal")
        .center();
    }, 100);

    var bottomCheck = setInterval(function() {
      if (lastPagePos === Jdoc.scrollTop()) {
        clearInterval(bottomCheck);
        clearInterval(scrollBottom);
        onSuccess();
      } else
        lastPagePos = Jdoc.scrollTop();
    }, 3000);
  });


function setHTML(message) {
  var modal = jQuery("#loadingPageModal");
  modal.show();
  modal.find(".imgWallLoadingPageModal").css("height", "auto").html(`<div><img src="https://steamcommunity-a.akamaihd.net/public/images/login/throbber.gif"></img>${ message }</div><div>⚠️All work is done automatically. Don't do anything else until the work is done.⚠️</div>`);
}

function deleteRun() {
  var screenShots = {};
  var datapre = {
    action: "delete",
    sessionid: sessionID
  };
  jQuery(".imgWallHover").each(function(index, val) {
    val = jQuery(val);
    var idFixed = val.attr("id").replace("imgWallHover", "");
    console.log(idFixed);
    screenShots["screenshots[" + Number(idFixed) + "]"] = "on";
  });
  datapre = Object.assign(datapre, screenShots);
  var countRefreshInterval = setInterval(function() {
    getScreenShot(function(count) {
      setHTML("Deleting all screenshots! (" + count + " left)");
    });
  }, 1000);
  jQuery.ajax({
    url: window.location.href,
    data: datapre,
    method: "post",
    complete: function(result) {
      clearInterval(countRefreshInterval);
      setHTML("Delete all screenshots!");
      alert("Delete all screenshots!");
      window.location.href = window.location.href;
    }
  });
}

function onSuccess() {
  setHTML("Requesting server...");
  deleteRun();
}

function getScreenShot(callback) {
  jQuery.ajax({
    url: window.location.href.replace("/screenshots", ""),
    method: "get",
    dataType: "html",
    complete: function(result) {
      try {
        var communityHtml = jQuery(result.responseText);
        var count = communityHtml.find(".profile_item_links")
          .children()
          .eq(2)
          .find(".profile_count_link_total")
          .text()
          .trim();
        callback(count)
      } catch (exception) {
        callback("unknown");
      }
    }
  });
}

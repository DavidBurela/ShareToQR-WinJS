// For an introduction to the Share Contract template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232513

(function () {
    "use strict";

    var app = WinJS.Application;
    var share;

    function onShareSubmit() {
        document.querySelector(".progressindicators").style.visibility = "visible";
        document.querySelector(".commentbox").disabled = true;
        document.querySelector(".submitbutton").disabled = true;

        // TODO: Do something with the shared data stored in the 'share' var.

        share.reportCompleted();
    }

    // This function responds to all application activations.
    app.onactivated = function (args) {
        var thumbnail;

        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            share = args.detail.shareOperation;
            
            if (share.data.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.uri)) {
                share.data.getUriAsync().then(function (uri) {
                    if (uri != null) {
                        var uriString = uri.rawUri;
                        // Find the QR canvas, and set it as the data sent in the share contract
                        jQuery('#qrcodeCanvas').qrcode({
                            text: uriString
                        });
                    }
                });
            }

            document.querySelector(".submitbutton").onclick = onShareSubmit;

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

            thumbnail = share.data.properties.thumbnail;
            if (thumbnail) {
                // If the share data includes a thumbnail, display it.
                args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
                    document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
                }));
            } else {
                // If no thumbnail is present, expand the description  and
                // title elements to fill the unused space.
                document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
                document.querySelector(".shared-thumbnail").style.visibility = "hidden";
            }
        }
    };

    app.start();
})();

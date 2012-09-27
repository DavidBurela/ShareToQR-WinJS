// For an introduction to the Share Contract template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232513

(function () {
    "use strict";

    var app = WinJS.Application;
    var share;

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

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

        }
    };

    app.start();
})();

package com.chromium.client;

import android.Manifest;
import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.webkit.MimeTypeMap;

import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
    name = "MediaDownloader",
    permissions = {
        @Permission(
            alias = "storage",
            strings = { Manifest.permission.WRITE_EXTERNAL_STORAGE }
        )
    }
)
public class MediaDownloaderPlugin extends Plugin {

    @PluginMethod
    public void download(PluginCall call) {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P &&
            getPermissionState("storage") != PermissionState.GRANTED) {
            requestPermissionForAlias("storage", call, "storagePermissionCallback");
            return;
        }

        enqueueDownload(call);
    }

    @PermissionCallback
    private void storagePermissionCallback(PluginCall call) {
        if (getPermissionState("storage") != PermissionState.GRANTED) {
            call.reject("Storage permission denied");
            return;
        }

        enqueueDownload(call);
    }

    private void enqueueDownload(PluginCall call) {
        String url = call.getString("url");
        String filename = call.getString("filename");

        if (url == null || url.trim().isEmpty()) {
            call.reject("Download URL is missing");
            return;
        }
        if (filename == null || filename.trim().isEmpty()) {
            call.reject("Filename is missing");
            return;
        }

        try {
            Uri uri = Uri.parse(url);
            DownloadManager.Request request = new DownloadManager.Request(uri);
            request.setTitle(filename);
            request.setDescription("Chromium");
            request.setNotificationVisibility(
                DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED
            );
            request.setAllowedOverMetered(true);
            request.setAllowedOverRoaming(true);
            request.addRequestHeader("User-Agent", "Chromium/1.0");

            String extension = MimeTypeMap.getFileExtensionFromUrl(url);
            String mimeType = MimeTypeMap.getSingleton()
                .getMimeTypeFromExtension(extension == null ? "" : extension.toLowerCase());
            if (mimeType != null) {
                request.setMimeType(mimeType);
            }

            request.setDestinationInExternalPublicDir(
                Environment.DIRECTORY_DOWNLOADS,
                "Chromium/" + filename
            );

            DownloadManager manager = (DownloadManager) getContext()
                .getSystemService(Context.DOWNLOAD_SERVICE);
            if (manager == null) {
                call.reject("Android download service is unavailable");
                return;
            }

            long downloadId = manager.enqueue(request);
            JSObject result = new JSObject();
            result.put("downloadId", downloadId);
            call.resolve(result);
        } catch (Exception error) {
            call.reject("Could not start download: " + error.getMessage(), error);
        }
    }
}

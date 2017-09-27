from plone.app.contenttypes.browser.folder import FolderView
from Products.Five.browser import BrowserView


class GalleryView(FolderView, BrowserView):
    """
    Gallery view
        self.request.form
    """

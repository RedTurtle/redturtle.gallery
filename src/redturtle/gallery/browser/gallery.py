# -*- coding: utf-8 -*-
from plone.app.contenttypes.browser.folder import FolderView
from Products.CMFPlone.resources import add_bundle_on_request
from Products.Five.browser import BrowserView


class GalleryView(FolderView, BrowserView):
    """
    Gallery view
    """
    def __call__(self):
        add_bundle_on_request(self.request, 'redturtle-gallery-bundle')
        return super(GalleryView, self).__call__()


class GalleryModal(BrowserView):
    """
    Gallery modal for slick carousel
    """

    contents = []
    itemIndex = -1

    def __init__(self, context, request):
        self.context = context
        self.request = request
        self.getContents()
        self.getIndex()

    def getContents(self):
        self.contents = self.context.listFolderContents(
                            contentFilter={'portal_type': 'Image'}
                        )
        return self.contents

    def getIndex(self):
        self.itemIndex = [x.UID() for x in self.contents].index(
                            self.request.form['image']
                         )
        return self.itemIndex

# -*- coding: utf-8 -*-
from plone.app.contenttypes.browser.folder import FolderView
from plone.app.contenttypes.browser.collection import CollectionView
from Products.CMFPlone.resources import add_bundle_on_request
from Products.Five.browser import BrowserView


class GalleryView(FolderView, BrowserView):
    """
    Gallery view
    """
    def __call__(self):
        add_bundle_on_request(self.request, 'collective-slick')
        add_bundle_on_request(self.request, 'redturtle-gallery-bundle')
        return super(GalleryView, self).__call__()


class GalleryCollectionView(CollectionView, GalleryView):
    """
    Gallery view for collections
    """
    def __call__(self):
        return super(GalleryCollectionView, self).__call__()

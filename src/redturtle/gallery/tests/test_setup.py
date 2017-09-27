# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from redturtle.gallery.testing import REDTURTLE_GALLERY_INTEGRATION_TESTING  # noqa

import unittest


class TestSetup(unittest.TestCase):
    """Test that redturtle.gallery is properly installed."""

    layer = REDTURTLE_GALLERY_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if redturtle.gallery is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'redturtle.gallery'))

    def test_browserlayer(self):
        """Test that IRedturtleGalleryLayer is registered."""
        from redturtle.gallery.interfaces import (
            IRedturtleGalleryLayer)
        from plone.browserlayer import utils
        self.assertIn(
            IRedturtleGalleryLayer,
            utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = REDTURTLE_GALLERY_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['redturtle.gallery'])

    def test_product_uninstalled(self):
        """Test if redturtle.gallery is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'redturtle.gallery'))

    def test_browserlayer_removed(self):
        """Test that IRedturtleGalleryLayer is removed."""
        from redturtle.gallery.interfaces import \
            IRedturtleGalleryLayer
        from plone.browserlayer import utils
        self.assertNotIn(
           IRedturtleGalleryLayer,
           utils.registered_layers())

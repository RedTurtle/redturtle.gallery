# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PloneSandboxLayer
from plone.testing import z2

import redturtle.gallery


class RedturtleGalleryLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        self.loadZCML(package=redturtle.gallery)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'redturtle.gallery:default')


REDTURTLE_GALLERY_FIXTURE = RedturtleGalleryLayer()


REDTURTLE_GALLERY_INTEGRATION_TESTING = IntegrationTesting(
    bases=(REDTURTLE_GALLERY_FIXTURE,),
    name='RedturtleGalleryLayer:IntegrationTesting'
)


REDTURTLE_GALLERY_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(REDTURTLE_GALLERY_FIXTURE,),
    name='RedturtleGalleryLayer:FunctionalTesting'
)


REDTURTLE_GALLERY_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        REDTURTLE_GALLERY_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='RedturtleGalleryLayer:AcceptanceTesting'
)

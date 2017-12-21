# -*- coding: utf-8 -*-
from plone import api
from redturtle.gallery import logger


DEFAULT_PROFILE = 'profile-redturtle.gallery:default'


def import_registry(registry_id, dependencies=False):
    setup_tool = api.portal.get_tool('portal_setup')
    setup_tool.runImportStepFromProfile(DEFAULT_PROFILE, registry_id,
                                        run_dependencies=dependencies)


def import_css_registry(context):
    'Import CSS registry configuration'
    logger.info('Importing CSS registry configuration for ' +
                'redturtle.gallery')
    import_registry('cssregistry')


def import_js_registry(context):
    'Import js registry configuration'
    logger.info('Importing js registry configuration for ' +
                'redturtle.gallery')
    import_registry('jsregistry')


def import_actions_registry(context):
    'Import actions registry configuration'
    logger.info('Importing actions registry configuration for ' +
                'redturtle.gallery')
    import_registry('actions')


def import_types_registry(context):
    'Import types registry configuration'
    logger.info('Importing types registry configuration for ' +
                'redturtle.gallery')
    import_registry('typeinfo')


def import_viewlets_registry(context):
    'Import viewlets registry configuration'
    logger.info('Importing viewlets registry configuration for ' +
                'redturtle.gallery')
    import_registry('viewlets')


def import_properties_registry(context):
    'Import properties registry configuration'
    logger.info('Importing properties registry configuration for ' +
                'redturtle.gallery')
    import_registry('propertiestool')


def import_records_registry(context):
    'Import records and settings'
    logger.info('Importing records and settings configuration for' +
                'redturtle.gallery')
    import_registry('plone.app.registry')

/*
    Copyright (C) 2016  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict';

//dependencies
var _ = require('lodash');
var Configuration = require('../../../config');
var HtmlEncoder = require('htmlencode');
var UrlUtils = require('../../../../lib/utils/urlUtils');

/**
 * Provides functions to provide common functionality among media renderers
 * @class BaseMediaRenderer
 * @constructor
 */
class BaseMediaRenderer {

    /**
     * Renders an iframe element
     * @static
     * @method renderSingleElementEmbed
     * @return {String} HTML
     */
    static renderIFrameEmbed  (srcUrl, attrs, style) {
        return BaseMediaRenderer.renderSingleElementEmbed('iframe', srcUrl, attrs, style);
    }

    /**
     * Renders a single element
     * @static
     * @method renderSingleElementEmbed
     * @return {String} HTML
     */
    static renderSingleElementEmbed  (elementName, srcUrl, attrs, style) {
        if (!attrs) {
            attrs = {};
        }
        if (!style) {
            style = {};
        }

        return '<' + elementName + ' src="' + HtmlEncoder.htmlEncode(srcUrl) + '" ' +
            BaseMediaRenderer.getAttributeStr(attrs) +
            BaseMediaRenderer.getStyleAttrStr(style) +
            '></' + elementName + '>';
    }

    /**
     * Retrieves the source URI that will be used when generating the rendering.
     * This base implementation prepends the configured media urlRoot value to the media URI.
     * @static
     * @method getEmbedUrl
     * @param {String} mediaId The unique (only to the type) media identifier
     * @return {String} A properly formatted URI string that points to the resource
     * represented by the media Id
     */
    static getEmbedUrl  (mediaId) {
        if (mediaId.indexOf('http://') === 0 || mediaId.indexOf('https://') === 0 || mediaId.indexOf('//') === 0) {
            return mediaId;
        }
        return UrlUtils.urlJoin(Configuration.active.media.urlRoot, mediaId);
    }

    /**
     * Generates an attribute string from a hash of key/value pairs
     * @static
     * @method getAttributeStr
     * @return {String}
     */
    static getAttributeStr  (attr) {
        if (!_.isObject(attr)) {
            return '';
        }

        var attrStr = '';
        _.forEach(attr, function (value, key/*, attr, i*/) {
            attrStr += key + '="' + HtmlEncoder.htmlEncode(value + '') + '" ';
        });
        return attrStr;
    }

    /**
     * Generates a style string from a hash of key/value pairs.  The string
     * includes the 'sytle="[STUFF HERE]"' wrapper
     * @static
     * @method getStyleAttrStr
     * @return {String}
     */
    static getStyleAttrStr  (style) {
        if (!_.isObject(style)) {
            return null;
        }
        else if (Object.keys(style).length === 0) {
            return '';
        }

        var styleStr = 'style="';
        _.forEach(style, function (value, key/*, style, i*/) {
            styleStr += key + ':' + HtmlEncoder.htmlEncode(value + '') + ';';
        });
        styleStr += '" ';
        return styleStr;
    }
}

//exports
module.exports = BaseMediaRenderer;

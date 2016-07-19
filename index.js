var http = require('http');
var extend = require("xtend");
var querystring = require('querystring');

/**
 *
 * @param {type} config
 * @returns {weatherData}
 */
var weatherData = function (config) {
    "use strict";

    var _self = this;

    _self.opts = extend({
        username: '',
        password: '',
        stationName: ''
    }, config);
};

/**
 *
 * @param {type} opts
 * @param {type} cb
 * @returns {undefined}
 */
weatherData.prototype.submitUpdate = function (opts, cb) {
    var _self = this;

    var params = extend({
        name: _self.opts.stationName
    }, opts);

    var postData = querystring.stringify(params);

    var options = {
        hostname: 'openweathermap.org',
        port: 80,
        path: '/data/post',
        method: 'POST',
        auth: _self.opts.username + ':' + _self.opts.password,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var req = http.request(options, function (res) {
        var buffer = '';

        res.on('data', function (data) {
            return buffer += data;
        });

        res.on('error', function (error) {
            cb(error);
        });

        res.on('end', function () {
            var error, json;
            try {
                json = JSON.parse(buffer);
            } catch (_error) {
                error = _error;
                return cb(error);
            }

            return cb(null, json);
        });
    });

    req.on('error', function (error) {
        cb(error);
    });

    req.write(postData);
    req.end();
};

/**
 *
 * @returns {builder|weatherData.prototype.dataBuilder.builder}
 */
weatherData.prototype.dataBuilder = function () {
    var builder = function () {
        var _self = this;

        _self.data = {};
    };

    /**
     * Weather station name
     * @param {String} name
     * @returns {weatherData.prototype.dataBuilder.builder}
     */
    builder.prototype.withName = function (name) {
        this.data.name = name;

        return this;
    };

    /**
     *
     * @param {type} wind_dir
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withWindDir = function (wind_dir) {
        this.data.wind_dir = wind_dir;

        return this;
    };

    /**
     *
     * @param {type} wind_speed
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withWindSpeed = function (wind_speed) {
        this.data.wind_speed = wind_speed;

        return this;
    };

    /**
     *
     * @param {type} wind_gust
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withWindGust = function (wind_gust) {
        this.data.wind_gust = wind_gust;

        return this;
    };

    /**
     *
     * @param {type} temp
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withTemperature = function (temp) {
        this.data.temp = temp;

        return this;
    };

    /**
     *
     * @param {type} humidity
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withHumidity = function (humidity) {
        this.data.humidity = humidity;

        return this;
    };

    /**
     *
     * @param {type} pressure
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withAtmosphericPressure = function (pressure) {
        this.data.pressure = pressure;

        return this;
    };

    /**
     *
     * @param {type} rain_1h
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withRain_1h = function (rain_1h) {
        this.data.rain_1h = rain_1h;

        return this;
    };

    /**
     *
     * @param {type} rain_1h
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withRain_1h = function (rain_1h) {
        this.data.rain_1h = rain_1h;

        return this;
    };

    /**
     *
     * @param {type} rain_24h
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withRain_24h = function (rain_24h) {
        this.data.rain_24h = rain_24h;

        return this;
    };

    /**
     *
     * @param {type} rain_today
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withRainToday = function (rain_today) {
        this.data.rain_today = rain_today;

        return this;
    };

    /**
     *
     * @param {type} snow
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withSnow = function (snow) {
        this.data.snow = snow;

        return this;
    };

    /**
     *
     * @param {type} lum
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withLum = function (lum) {
        this.data.lum = lum;

        return this;
    };

    /**
     *
     * @param {type} lat
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withLatitude = function (lat) {
        this.data.lat = lat;

        return this;
    };

    /**
     *
     * @param {type} long
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withLongitude = function (long) {
        this.data.long = long;

        return this;
    };

    /**
     *
     * @param {type} alt
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withAltitude = function (alt) {
        this.data.alt = alt;

        return this;
    };

    /**
     *
     * @param {type} radiation
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withRadiation = function (radiation) {
        this.data.radiation = radiation;

        return this;
    };

    /**
     *
     * @param {type} dewpoint
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withDewpoint = function (dewpoint) {
        this.data.dewpoint = dewpoint;

        return this;
    };

    /**
     *
     * @param {type} uv
     * @returns {weatherData.prototype.dataBuilder.builder.prototype}
     */
    builder.prototype.withUvIndex = function (uv) {
        this.data.uv = uv;

        return this;
    };

    /**
     *
     * @param {type} cb
     * @returns {undefined}
     */
    builder.prototype.submitUpdate = function (cb) {
        _self.submitUpdate(this.data, cb);
    };

    return new builder();
};

module.exports = weatherData;
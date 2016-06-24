'use strict';

const prettyJSON = require('prettyjson');
const Table = require('cli-table');
const _ = require('lodash');
const is = require('./lib/is');

module.exports = (grunt) => {

    Object.defineProperties(grunt.log, {

        'prettyJSON': {
            'value': (data, options) => {
                console.log(prettyJSON.render(data, options));
            }
        },

        'cliTable': {
            'value': (options, rows) => {
                if (_.isArray(options)) {
                    rows = options;
                    let headings = rows.reduce((prev, curr, i, data) => {
                        _.each(curr, (v, k) => {
                            if (prev.indexOf(k) < 0) {
                                prev.push(k);
                            }
                        });
                        return prev;
                    }, []);
                    let colWidths = headings.map((heading) => {
                        let w = heading.length + 2;
                        rows.forEach((row) => {
                            if (row[heading] && (row[heading].toString().length + 2) > w) {
                                w = row[heading].toString().length + 2;
                            }
                        });
                        return w;
                    });
                    let table = new Table({
                        'head': headings,
                        'colWidths': colWidths
                    });
                    rows = rows.map((row) => {
                        let r = [];
                        headings.forEach((h) => {
                            r.push(row[h] || '-');
                        });
                        return r;
                    });
                    table.push.apply(table, rows);
                    console.log(table.toString());
                } else {
                    options.head = options.head || [];
                    let hasMappings = false;
                    let maps = _.cloneDeep(options.head);
                    options.head = options.head.map((head) => {
                        if (is('Object', head)) {
                            hasMappings = true;
                            return head.label;
                        } else {
                            return head;
                        }
                    });
                    if (hasMappings) {
                        rows = rows.map((row) => {
                            let res = [];
                            maps.forEach((map) => {
                                res.push(row[map.key] || '-');
                            });
                            return res;
                        });
                    }
                    let table = new Table(options);
                    table.push.apply(table, rows);
                    console.log(table.toString());
                }
            }
        }

    });

    Object.defineProperties(grunt.verbose, {

        'prettyJSON': {
            'value': (data, options) => {
                if (!grunt.option('verbose')) return;
                grunt.prettyJSON(data, options);
            }
        },

        'cliTable': {
            'value': (options, rows) => {
                if (!grunt.option('verbose')) return;
                grunt.table(options, rows);
            }
        }

    });

};
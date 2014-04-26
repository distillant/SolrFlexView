define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
       // EmployeeListView    = require('app/views/EmployeeList'),
       // models              = require('app/models/employee'),
        tpl                 = require('text!tpl/Shell.html'),

        template = _.template(tpl),
        $menuItems;

    return Backbone.View.extend({

        initialize: function () {
        //    this.employeeList = new models.EmployeeCollection();
        },

        render: function () {
            this.$el.html(template());
            //var listView = new EmployeeListView({collection: this.employeeList, el: $(".employee-list", this.el)});
            //listView.render();
            $menuItems = $('.navbar .nav li', this.el);
            return this;
        },


        selectMenuItem: function (menuItem) {
            $menuItems.removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }

    });

});
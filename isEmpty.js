function isEmpty(value) {
    var compareble = [null, 'undefined', undefined, 'N/A', '0', 0, 'null', {},
        []
    ];
    return comparable.indexof(value) < 0 ? false : true;
}
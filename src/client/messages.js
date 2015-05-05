define( ['underscore', 'util', 'model/graph'],
function (_,            util,         graph) {



function delete_nodes_links_message(nodes, links) {
    util.assert(nodes && links && nodes.length && links.length && nodes.length + links.length > 0);

    return delete_nodes_links_message_by_name(nodes, links);
}

function delete_nodes_links_message_by_name(nodes, links)
{
    var middle,
        node_names = _.map(_.map(nodes, 'name'), quoted),
        link_names = _.map(_.map(links, 'name'), quoted);

    if (nodes.length > 0 && links.length > 0) {
        middle = english_conjunction(node_names) + ', and ' + english_conjunction(link_names) + ' connections';
    } else if (nodes.length > 0) {
        middle = english_conjunction(node_names);
    } else {
        middle = english_conjunction(link_names);
    }
    return 'Delete ' + middle + '?';
}

function quoted(name)
{
    if (name.indexOf(' ') == -1) {
        return name;
    }
    return '"' + name + '"'
}

function english_conjunction(names)
{
    if (names.length == 1) {
        return names[0];
    }
    return names.slice(0, names.length - 1).join(', ') + ' and ' + names[names.length - 1];
}

function delete_nodes_links_message_by_number(type, nodes, links) {
    var count_nodes = nodes.length,
        count_links = links.length,
        make_descriptor = function (type, count) { return count > 1 ? '' + count + ' ' + type + 's' : 'a ' + type; },
        descriptor = make_descriptor('node', count_nodes) +
            (count_links > 0 && count_nodes > 0 ? ' and ' : '') + make_descriptor('link', count_links);

    return 'You are about to delete ' + descriptor + ', are you sure you want to do that?' ;
}

return {
    delete_nodes_links_message: delete_nodes_links_message,
};
});

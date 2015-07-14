"""
setup.py

- Write a file called _fileSeed.js to /server that inserts a Meteor.Collection
  listing all files available to read and display via d3.js.
- jordan matelsky (@j6k4m8)
"""

import os, sys
from os import path

def get_parent_dir(directory):
    """returns the parent directory of the supplied directory."""
    return os.path.dirname(directory)


def files_ending_with(ext=".attredge"):
    """returns all files in a directory that have the listed extension."""
    return [f for f in os.listdir(get_parent_dir(os.getcwd()) + '/public/graphs/') if ext in f]


def insertion_statements_from(files):
    """creates meteor-mongo insertion statements (js) for a set of strings"""
    return '_seed=function(){if(!AttrEdges.findOne()){\n' + '\n'.join(["AttrEdges.insert({filename:'" + f + "'});" for f in files]) + '}}'


def write_to_file(insertions, fout="_fileSeed.js"):
    """writes a string to a file."""
    f = open(get_parent_dir(os.getcwd()) + '/server/' + fout, 'w')
    f.write(insertions)


"""
Write a file called _fileSeed.js to /server that inserts a Meteor.Collection
listing all files available to read and display via d3.js.
"""
write_to_file( insertion_statements_from( files_ending_with('.attredge') ) )

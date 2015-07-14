"""
graphml_to_json
jordan matelsky (@j6k4m8) 2015
"""

"""i2g_testgraph_ac3_img2graph_v29_syn_obj_edge_paramset_1.graphml"""
"""i2g_testgraph_ac3_img2graph_v29_syn_obj_edge_paramset_10.attredge"""

import xml.etree.ElementTree as et
import pdb


class Node(object):
    def __init__(self, name):
        self.name = name

class Edge(object):
    def __init__(self, source, target):
        self.source = source
        self.target = target


class GraphConverter(object):
    """Convert GraphML to JSON (and back..?)"""

    def __init__(self, fin=''):
        self.fin = fin
        self.nodes = []
        self.edges = []

    def load_graphml_file(self, fin=''):
        if fin is '' and self.fin is '':
            raise Exception('No file supplied in `self.fin`.')

        if fin is '':
            fin = self.fin

        tree = et.parse(fin)
        root = tree.getroot()
        pdb.set_trace()
        self.nodes = [Node(i.id) for i in root.findall('node')]

        print len(self.nodes)




    def write_json_file(fout):
        pass;


    def convert_graphml(graph):
        pass;

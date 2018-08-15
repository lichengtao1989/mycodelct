export default {
  //得到长度最大为length的文本
  getText(text, length) {
    if(text.length <= length) {
      return text;
    }
    return text.substr(0, length - 1) + '...';
  },
  //得到节点关系
  getRelationNodes(relations, oldData){
    let relationNodes = [];
    relations.forEach((relation)=> {
      let matchItem = relationNodes.find((r)=> {
        return (r.parents.includes(relation.source) || r.children.includes(relation.target)) && r.name === relation.name;
      });
      if (matchItem) {
        if (matchItem.parents.includes(relation.source) && matchItem.children.includes(relation.target)) {
          return;
        }
        if (matchItem.parents.includes(relation.source)) {
          matchItem.children.push(relation.target);
        } else {
          matchItem.parents.push(relation.source);
        }
      } else {
        let oldItem = oldData.find(item=> {
          return item.name === relation.name && (item.parents.includes(relation.source) || item.children.includes(relation.target));
        });
        relationNodes.push({
          parents: [relation.source],
          children: [relation.target],
          name: relation.name,
          x: oldItem ? oldItem.x : (relation.x || 0),
          y: 0,
          level: relation.source.level
        })
      }
    });
    return relationNodes;
  },
  formatRelations(nodes, relations){
    return relations.map(relation=> {
      return {
        name: relation.name,
        x: relation.x,
        y: relation.y,
        source: nodes.find(n=> {
          return n.id === relation.source;
        }),
        target: nodes.find(n=> {
          return n.id === relation.target;
        })
      }
    });
  },
  //计算节点的level
  computeNodeLevel(nodes, relations){
    if(nodes.length === 0) {
      return;
    }
    nodes.forEach((node)=> {
      node.level = undefined;
    });
    //定一个基调，设置第一个关系的父节点的level为100
    nodes[0].level = 100;
    let noLevelNode;
    do{
      relations.forEach((relation)=> {
        let source = nodes.find((node)=> {
          return node === relation.source;
        });
        let target = nodes.find((node)=> {
          return node === relation.target;
        });
        if(source.level !== undefined && target.level === undefined) {
          target.level = source.level + 1;
        } else if(source.level === undefined && target.level !== undefined) {
          source.level = target.level - 1;
        }
      });
      noLevelNode = nodes.find((node)=> {
        return node.level === undefined;
      });
    } while(noLevelNode != null);
    //得到最小的level值
    let minLevel = Math.min(...nodes.map(node=> {
      return node.level
    }));
    nodes.forEach((node)=> {
      node.level -= minLevel;
    });
  }
}

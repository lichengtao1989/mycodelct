import traceTreeUtil from '../../../../../src/views/traceTree/util.js'

describe('traceTree -> util', ()=>{
  const nodes = [
    {
      "id":"1",
      "x":"25.25",
      "y":"25.25",
      "productID":"aaa67fc8-ee16-4213-95a6-a50a2fff4a96",
      "productName":"土豆"
    },
    {
      "id":"2",
      "x":"25.25",
      "y":"25.25",
      "productID":"aaa67fc8-ee16-4213-95a6-a50a2fff4a96",
      "productName":"土豆"
    },
    {
      "id":"3",
      "x":"25.25",
      "y":"25.25",
      "productID":"aaa67fc8-ee16-4213-95a6-a50a2fff4a96",
      "productName":"土豆"
    }
  ];
  const relations = [
    {
      "x":"25.25",
      "y":"25.25",
      "source":"1",
      "target":"3",
      "name":"炒"
    },
    {
      "x":"25.25",
      "y":"25.25",
      "source":"2",
      "target":"3",
      "name":"炒"
    }
  ];
  const formatRelations = [
    {
      "x":"25.25",
      "y":"25.25",
      "source": nodes[0],
      "target": nodes[2],
      "name":"炒"
    },
    {
      "x":"25.25",
      "y":"25.25",
      "source": nodes[1],
      "target": nodes[2],
      "name":"炒"
    }
  ];

  it('getText', ()=>{
    expect(traceTreeUtil.getText('12345', 6)).to.equal('12345');
    expect(traceTreeUtil.getText('12345', 5)).to.equal('12345');
    expect(traceTreeUtil.getText('12345', 4)).to.equal('123...');
  });

  it('computeNodeLevel', ()=>{
    traceTreeUtil.computeNodeLevel(nodes, formatRelations);
    expect(nodes[0].level).to.equal(0);
    expect(nodes[1].level).to.equal(0);
    expect(nodes[2].level).to.equal(1);
  });

  it('getRelationNodes', ()=>{
    const relationNodes = traceTreeUtil.getRelationNodes(formatRelations, []);
    expect(relationNodes.length).to.equal(1);
    expect(relationNodes[0].name).to.equal('炒');
    expect(relationNodes[0].x).to.equal('25.25');
    expect(relationNodes[0].y).to.equal(0);
    expect(relationNodes[0].level).to.equal(0);
    expect(relationNodes[0].parents.length).to.equal(2);
    expect(relationNodes[0].parents[0]).to.equal(nodes[0]);
    expect(relationNodes[0].parents[1]).to.equal(nodes[1]);
    expect(relationNodes[0].children.length).to.equal(1);
    expect(relationNodes[0].children[0]).to.equal(nodes[2]);
  });

  it('formatRelations', ()=>{
    const formatedRelations = traceTreeUtil.formatRelations(nodes, relations);
    expect(formatedRelations.length).to.equal(2);
    expect(formatedRelations[0].x).to.equal('25.25');
    expect(formatedRelations[0].y).to.equal('25.25');
    expect(formatedRelations[0].name).to.equal('炒');
    expect(formatedRelations[0].source).to.equal(nodes[0]);
    expect(formatedRelations[0].target).to.equal(nodes[2]);
    expect(formatedRelations[1].source).to.equal(nodes[1]);
    expect(formatedRelations[1].target).to.equal(nodes[2]);
  });
});

var json = {
    'label': ['label A', 'label B', 'label C'],
    'values': [
    {
      'label': 'dateA',
      'valuesX': [-10, 10, 50, 100],
      'valuesY': [-100, -40, 55, 105],
      'type': 'circle'
    },
    {
      'label': 'dateB',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-80, -10, 45, 100],
      'color': 'red'
    },
    {
      'label': 'dateC',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-38, -10, 125, 150]
    }]
};

var json2 = {
    'label': ['label A', 'label B', 'label C'],
    'values': [
    {
      'label': 'dateA',
      'valuesX': [-100, 10, 50, 100],
      'valuesY': [-200, -80, 15, 55],
      'type': 'circle'
    },
    {
      'label': 'dateB',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-10, -50, -90, -150],
      'color': 'red'
    },
    {
      'label': 'dateC',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-150, 100, -25, 90]
    }]
};

function init() {
  var lc = new $jit.LineChart({
    //id of the visualization container
    injectInto: 'infovis',
    //Native canvas text styling
    Label: {
      type: 'HTML',
      size: 10,
      style: 'bold',
      color: '#ccc'
    },
    // with animation
    animate: true,
    Events: {
      enable: true,
      type: 'Native',
      onClick: function(node) {
        console.log(node);
      }
    },
    background: {
      type: 'GridWithAxis',
      CanvasStyles: {
        fillStyle: 'white',
        font: 'bold 12px Arial'
      },
      legendX: 'legend X',
    },
    Node: {
      overridable:true
    },
    Margin: {
      top: 20,
      left: 0,
      bottom: 0,
      right: 20
    },
    onAfterCompute: function(viz) {
      var ranges = viz.calculateRanges(),
          base = viz.canvas.canvases[1],
          conf = viz.config,
          ctx = base.getCtx(),
          canvas = base.canvas,
          margin = viz.config.Margin,
          iniWidth = -canvas.width/2,
          iniHeight = canvas.height/2,
          xRange = ranges.xRange,
          yRange = ranges.yRange,
          offset = viz.backgroundConfig.axisOffset,
          width = canvas.width - margin.left - margin.right,
          height = canvas.height - margin.top - margin.bottom,
          numberOfDivisions = viz.backgroundConfig.numberOfDivisions,
          heightDivision = height / numberOfDivisions-1,
          widthDivision = canvas.width / numberOfDivisions-1;

      // cleaning canvas
      var size = lc.canvas.getSize();
      lc.canvas.getCtx(1).clearRect(iniWidth, iniHeight, size.width, size.height);
      base.plot(base);
      
      // DRAWING NUMBERS
      var interY = yRange / (numberOfDivisions-1),
          startY = ranges.minY,
          interX = xRange / (numberOfDivisions-1),
          startX = ranges.minX,
          membersX = [startX.toFixed(2)],
          membersY = [startY.toFixed(2)];
      for (var i=1; i<numberOfDivisions; i++) {
        startY += interY;
        startX += interX;
        membersX.push(startX.toFixed(2));
        membersY.push(startY.toFixed(2));
      }
      for (var i=1, j=0; i<=numberOfDivisions; i++, j++) {
        ctx.fillText(membersX[j], iniWidth + widthDivision * i - 25, iniHeight - offset/2);
        ctx.fillText(membersY[j], iniWidth, iniHeight - heightDivision * i);
      }
      
    }
  });
  lc.loadJSON(json);
  lc.refresh();
  var list = $jit.id('id-list'),
      button = $jit.id('update');

  //update json on click
  var jsoncount = 0;
  var jsons = [json, json2];
  $jit.util.addEvent(button, 'click', function() {
    jsoncount = jsoncount + 1;
    lc.updateJSON(jsons[jsoncount%2]);
  });
}

const {readFileSync} = require('fs');
const JSOG = require('jsog');

const data = JSOG.parse(readFileSync("fake_data.json"));

module.exports = {
  Query: {
    group(_, {id}) { return data.groups.filter(g => g.id == id)[0]; },
    dataset(_, {id}) { return data.datasets.filter(d => d.id == id)[0]; },
    annotation(_, {id}) { return data.annotations.filter(a => a.id == id)[0]; },

    allAnnotations(_, {datasetFilter, filter}) {
      // only support filtering by dataset id
      // anything more than that requires storing the records in ES
      const n = filter.sumFormula ? 3 : 20;
      if (datasetFilter.ids)
        return data.annotations.filter(a => a.dataset.id == datasetFilter.ids).slice(0, n);
      else
        return data.annotations.slice(0, n);
    },

    allDatasets(_, {filter}) {
      if (filter.status != 'FINISHED')
        return [];
      if (filter.ids)
        return data.datasets.filter(d => d.id == filter.ids);
      else
        return data.datasets;
    },

    countAnnotations() { return 100; },
    countDatasets() { return 10; },
    metadataSuggestions() { return ['A', 'B', 'C']; },
    peopleSuggestions() { return data.datasets.map(d => d.submitter); },
    molecularDatabases() { return [{name: 'HMDB', version: '2016'}]; }
  },

  Annotation: {
    isotopeImages(a) {
      const {_width, _height} = a.dataset;
      return [{
        minIntensity: 0, maxIntensity: 100, totalIntensity: 1000, mz: a.mz, 
        url: 'https://picsum.photos/' + _width + '/' + _height + '/?random&did=' + a.id
      }];
    },
    peakChartData(a) {
      return JSON.stringify({
        ppm: 3.0,
        mz_grid: {min_mz: a.mz - 0.5, max_mz: a.mz + 4.5},
        theor: {
          centroid_mzs: [a.mz, a.mz + 1, a.mz + 2, a.mz + 3],
          mzs: [a.mz], ints: [100]
        }
      });       
    }
  }
}

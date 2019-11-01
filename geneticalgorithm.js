const fs = require('fs');

// function to generate the first population
function generatePopulation (populationLength) {
  return Array(populationLength).fill(null).map (i => {
    return {
      x1: Math.random() * 10,
      x2: Math.random() * 10,
      apt: null,
      sum: null,
    };
  });
}

// function to calculate fitness 
function calculateApt (x1, x2) {
  return Math.sqrt(x1) * Math.sin(x1) * Math.sqrt(x2) * Math.sin(x2) + 10;
}

// function to get Random numbers between two numbers
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// function to crossover childs
function crossover (population, crossoverRate) {
    let newPopulation = [];
    let total = 0;
    let c1x1, c1x2, c2x1, c2x2, c1apt, c2apt, c1sum, c2sum;
    for(let i = 0; i < population.length; i=i+2) {
        let ramdomNumber = Math.random();
        // check crossover
        if(ramdomNumber <= crossoverRate) {
            // first child
            c1x1 = ramdomNumber*population[i].x1 + (1 - ramdomNumber)*population[i+1].x1;
            c1x2 = ramdomNumber*population[i+1].x2 + (1 - ramdomNumber)*population[i].x2;
            c1apt = calculateApt(c1x1, c1x2);
            total = total + c1apt;
            c1sum = total;
            
            // second child 
            c2x1 = ramdomNumber*population[i].x2 + (1 - ramdomNumber)*population[i+1].x2;
            c2x2 = ramdomNumber*population[i+1].x1 + (1 - ramdomNumber)*population[i].x1;
            c2apt = calculateApt(c2x1, c2x2);
            total = total + c2apt;
            c2sum = total;

            newPopulation.push(generateChild(c1x1, c1x2, c1apt, c1sum));
            newPopulation.push(generateChild(c2x1, c2x2, c2apt, c2sum));
        } else {
            // first child
            c1x1 = population[i].x1;
            c1x2 = population[i].x2;
            c1apt = population[i].apt;
            total = total + c1apt;
            c1sum = total;

            // second child
            c2x1 = population[i + 1].x1;
            c2x2 = population[i + 1].x2;
            c2apt = population[i + 1].apt;
            total = total + c2apt;
            c2sum = total;

            newPopulation.push(generateChild(c1x1, c1x2, c1apt, c1sum));
            newPopulation.push(generateChild(c2x1, c2x2, c2apt, c2sum));
        }
    }
    return newPopulation;
}

// function to mutate the childs
function mutation (population, mutationRate) {
    let total = 0;
    for(let i=0; i< population.length; i++) {
        let firstRamdomNumber = Math.random();
        let secondRamdomNumber = Math.random();
        let mutated = false;
        if(firstRamdomNumber < mutationRate) {
            if(Math.random() > 0.5) {
                population[i].x1 = firstRamdomNumber + population[i].x1;
            } else {
                if(population[i].x1 < firstRamdomNumber) {
                    population[i].x1 = firstRamdomNumber + population[i].x1;
                } else {
                    population[i].x1 = population[i].x1 - firstRamdomNumber; 
                }
            }
            mutated = true;
        }
       
        if(secondRamdomNumber < mutationRate) {
            if(Math.random() > 0.5) {
                population[i].x2 = secondRamdomNumber + population[i].x2;
            } else {
                if(population[i].x2 < secondRamdomNumber) {
                    population[i].x2 = secondRamdomNumber + population[i].x2;
                } else {
                    population[i].x2 = population[i].x1 - secondRamdomNumber; 
                }
            }
            mutated = true;
        }

        if(mutated) {
            population[i].apt = calculateApt(population[i].x1, population[i].x2);
        }
        total = population[i].apt + total;
        population[i].sum = total;
    }
    return population;
}

// function to generate the child object
function generateChild(x1, x2, apt, sum) {
    return {
        x1: x1,
        x2: x2,
        apt: apt,
        sum: sum
    }
}

// function to select childs
function roulette(population) {
    let selected = [];
    let minimum = population[0].sum;
    let maximum = population[population.length - 1].sum;
    for (let i = 0; i < population.length; i++) {
      let ramdomNumber = getRandomArbitrary(minimum, maximum);
      selected.push(
        population.find (element => {
          if (ramdomNumber < element.sum) {
            return true;
          } else {
            return false;
          }
        })
      );
    
    }
    return selected;
}

// function to fill the population with fitness and the sum of fitness
function fillInitialPopulation(population) {
    let total = 0;
    population.map (element => {
        element.apt = calculateApt (element.x1, element.x2);
        total = total + element.apt;
        element.sum = total;
        return element;
      });
    
      return population; 
}

// function to get the best fitness of each generation
function getBestApt(population) {
    return population.reduce((apt,element) => apt = element.apt > apt ? element.apt : apt, null );
}

// function to get the worst fitness of each generation
function getWorstApt(population) {
    return population.reduce((apt,element) => apt = element.apt < apt ? element.apt : apt, population[0].apt );
}

// function to get the average fitness of each generation
function getMediumApt(population) {
    return population.reduce((totalApt, element) => totalApt += element.apt, 0)/population.length; 
}

// function to generate a Matlab File to plot graphics of the best, worst and average
function generateMatlabFile(worstData, bestData, mediumData, populationLength){
	let string = "clc;\n" 
	string += "clear;\n"
	string += "ymelhor = [" + bestData + "];\n";
	string += "ymedia = [" + mediumData + "];\n";
	string += "ypior = [" + worstData + "];\n";
	string += "xdata = [1:1:" + populationLength + "];\n";
	string += "plot(xdata,ypior);\n";
	string += "hold on;\n";
	string += "plot(xdata,ymedia);\n";
	string += "hold on;\n";
	string += "plot(xdata,ymelhor);\n";
	string += "hold on;\n";
	return string;
}

function main() {
	const args = process.argv.slice(2);
    const crossoverRate = Number(args[0]);
    const mutationRate = Number(args[1]);
    const populationLength = Number(args[2]);
    const generations = Number(args[3]);
    if(args.length != 4) {
    	return console.log("Compilation Error !!!\nCompilation should be: \n    node fileName.js <crossoverRate> <mutationRate> <populationLength> <NumberOfGenerations>");
    }
    const best = [];
    const worst = [];
    const medium = [];  
    let population = generatePopulation(populationLength);
    population = fillInitialPopulation(population);
    for(let i=0; i < generations; i++) {
        population = roulette(population);
        population = mutation(crossover(population, crossoverRate), mutationRate);
        best.push(getBestApt(population));
        worst.push(getWorstApt(population));
        medium.push(getMediumApt(population));
    }


    fs.writeFile('output.m', generateMatlabFile(worst, best, medium, population.length), function(err) {
    	if(err) {
    		return console.log(err);
    	}
    	console.log("MatlabFile was saved!");
    });
}

main();
'use strict';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {lists: [], gerandoListas: 0, ordenandoListas: 0, genType: 'random'};
        this.compareLists = this.compareLists.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.initializeList = this.initializeList.bind(this);
        this.sortLists = this.sortLists.bind(this);
    }

    compareLists() {
        this.initializeList().then(this.sortLists);
    }

    handleRadioChange(event) {
        event.persist();
        this.setState({ genType: event.target.value });
    }

    initializeList() {
        return new Promise((resolve) => {
            const genRandIntArray = (size) => (
                Array.from({length: size}, () => Math.floor(Math.random() * size))
            );

            const genInvertedIntArray = (size) => (
                new Array(size).fill(0).map((_, index) => size - index)
            );

            let total = 0;

            const genListAndCalcTime = (size) => {
                const inicio = new Date();
                const generatedList = this.state.genType === 'random' ? genRandIntArray(size) : genInvertedIntArray(size);
                let tempo = new Date() - inicio;

                this.setState((state) => {
                    let lists = generatedList.length === 100 ? [] : [...state.lists];
                    lists.push({
                        list: generatedList,
                        time: tempo,
                        bubbleSortTime: 0,
                        insertionSortTime: 0,
                        quickSortTime: 0
                    });

                    return {...state, lists}
                });

                this.setState({gerandoListas: (100 / 6100 * (total += size))})
            };

            genListAndCalcTime(20);
            genListAndCalcTime(30);
            genListAndCalcTime(50);
            genListAndCalcTime(200);
            genListAndCalcTime(300);
            genListAndCalcTime(500);
            genListAndCalcTime(2000);
            genListAndCalcTime(3000);

            resolve()
        });
    }

    sortLists() {
        const algoritimos = new Algoritimos();

        const orderListAndCalcTime = async (item, index, percentage) => {
            //bubbleSortTime
            await algoritimos.bubbleSort(item.list, percentage).then(itemOrdered => {
                this.setState((state) => {
                    let newState = {...state};
                    let lists = [...state.lists], item = lists[index];
                    delete newState.lists;

                    item.bubbleSortTime = itemOrdered.endTime;
                    newState.ordenandoListas += itemOrdered.percentage;

                    delete itemOrdered.percentage;
                    console.log('bubbleSort', itemOrdered);
                    return {...newState, lists}
                });
            });

            //insertionSortTime
            await algoritimos.insertionSort(item.list, percentage).then(itemOrdered => {
                this.setState((state) => {
                    let newState = {...state};
                    let lists = [...state.lists], item = lists[index];
                    delete newState.lists;

                    item.insertionSortTime = itemOrdered.endTime;
                    newState.ordenandoListas += itemOrdered.percentage;

                    delete itemOrdered.percentage;
                    console.log('insertionSort', itemOrdered);
                    return {...newState, lists}
                });
            });

            //quickSortTime
            await algoritimos.quickSort(item.list, percentage).then(itemOrdered => {
                this.setState((state) => {
                    let newState = {...state};
                    let lists = [...state.lists], item = lists[index];
                    delete newState.lists;

                    item.quickSortTime = itemOrdered.endTime;
                    newState.ordenandoListas += itemOrdered.percentage;

                    delete itemOrdered.percentage;
                    console.log('quickSort', itemOrdered);
                    return {...newState, lists}
                });
            });

            //countingSortTime
            await algoritimos.countingSort(item.list, percentage).then(itemOrdered => {
                this.setState((state) => {
                    let newState = {...state};
                    let lists = [...state.lists], item = lists[index];
                    delete newState.lists;

                    item.countingSortTime = itemOrdered.endTime;
                    newState.ordenandoListas += itemOrdered.percentage;

                    delete itemOrdered.percentage;
                    console.log('countingSort', itemOrdered);
                    return {...newState, lists}
                });
            });
        };

        this.state.lists.forEach(async (item, index) => {
            let percentage = (100 / 6100 * item.list.length) / 4;
            await orderListAndCalcTime(item, index, percentage);
        })
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h2>Tabela comparativa de desempenho:</h2>
                            </div>
                            <div className='col-md-6'>
                                <label className="radio-inline">
                                    <input type="radio" value="random" checked={this.state.genType === 'random'}
                                           onChange={this.handleRadioChange}/> Lista Random
                                </label>

                                <label className="radio-inline">
                                    <input type="radio" value="inverse" checked={this.state.genType === 'inverse'}
                                           onChange={this.handleRadioChange}/> Lista Invertida
                                </label>

                                <button onClick={this.compareLists} className='btn btn-lg btn-primary'>
                                    Comparar Listas
                                </button>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <h4>Gerando listas aleatórias: ({this.state.gerandoListas}%)</h4>
                            </div>
                            <div className='col-md-12'>
                                <div className="light-grey">
                                    <div className="green-bar" style={{width: `${this.state.gerandoListas}%`}}/>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <h4>Ordenando listas: ({this.state.ordenandoListas}%)</h4>
                            </div>
                            <div className='col-md-12'>
                                <div className="light-grey">
                                    <div className="blue-bar" style={{width: `${this.state.ordenandoListas}%`}}/>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <table className='table'>
                                    <thead>
                                    <tr>
                                        <th>Tamanho da List</th>
                                        <th>Bubble Sort</th>
                                        <th>Insertion Sort</th>
                                        <th>Quick Sort</th>
                                        <th>Counting Sort</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.lists.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.list.length}</td>
                                                <td>{item.bubbleSortTime}ms</td>
                                                <td>{item.insertionSortTime}ms</td>
                                                <td>{item.quickSortTime}ms</td>
                                                <td>{item.countingSortTime}ms</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
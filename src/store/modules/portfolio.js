const state = {
    funds: 10000,
    portfolioStocks: [],
};

const mutations = {
    buyStock(state, { stockId, quantity, stockPrice }) {
        const myStock = state.portfolioStocks.find(stock => stock.id === stockId);
        if (myStock) {
            myStock.quantity += quantity;
        } else {
            state.portfolioStocks.push({
                id: stockId,
                quantity,
                price: stockPrice,
            });
        }
        state.funds -= quantity * stockPrice;
    },
    sellStock(state, { stockId, quantity, stockPrice }) {
        const myStock = state.portfolioStocks.find(stock => stock.id === stockId);
        if (myStock.quantity > quantity) {
            myStock.quantity -= quantity;
        } else {
            state.portfolioStocks.splice(state.portfolioStocks.indexOf(myStock), 1);
        }
        state.funds += quantity * stockPrice;
    },
};

const actions = {
    buyStock({ commit }, order) {
        commit('buyStock', order);
    },
    sellStock({ commit }, order) {
        commit('sellStock', order);
    },
};

const getters = {
    stockPortfolio(state, getters) {
        return state.portfolioStocks.map((portfolioStocks) => {
            const marketStock = getters.stocks.find(stock => stock.id === portfolioStocks.id);
            return {
                id: marketStock.id,
                quantity: portfolioStocks.quantity,
                name: marketStock.name,
                price: portfolioStocks.price,
            };
        });
    },
    funds(state) {
        return state.funds;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};

import SubscriptionManager from './subscription_manager';
import BinarySocket        from '../../_common/base/socket_base';
import { isEmptyObject }   from '../../_common/utility';

const DAO = (() => {
    const activeSymbols = () =>
        BinarySocket.send({ active_symbols: 'brief' });

    const buy = (proposal_id, price) =>
        BinarySocket.send({ buy: proposal_id, price });

    const contractsFor = (symbol) =>
        BinarySocket.send({ contracts_for: symbol });

    const getAccountStatus = () =>
        BinarySocket.send({ get_account_status: 1 });

    const getSelfExclusion = () =>
        BinarySocket.send({ get_self_exclusion: 1 });

    const getSettings = () =>
        BinarySocket.send({ get_settings: 1 });

    const landingCompany = (residence) =>
        BinarySocket.send({ landing_company: residence });

    const logout = () =>
        BinarySocket.send({ logout: 1 });

    const mt5LoginList = () =>
        BinarySocket.send({ mt5_login_list: 1 });

    const payoutCurrencies = () =>
        BinarySocket.send({ payout_currencies: 1 });

    const statement = (limit, offset, date_boundaries) => BinarySocket.send({
        statement  : 1,
        description: 1,
        limit,
        offset,
        ...date_boundaries,
    });

    // ----- Streaming calls -----
    const forget = (msg_type, cb, match_values) =>
        SubscriptionManager.forget(msg_type, cb, match_values);

    const forgetAll = (...msg_types) =>
        SubscriptionManager.forgetAll(...msg_types);

    const subscribeBalance = (cb) =>
        SubscriptionManager.subscribe('balance', { balance: 1, subscribe: 1 }, cb);

    const subscribeProposal = (req, cb, should_forget_first) =>
        SubscriptionManager.subscribe('proposal', req, cb, should_forget_first);

    const subscribeTicks = (symbol, cb, should_forget_first) =>
        SubscriptionManager.subscribe('ticks', { ticks: symbol, subscribe: 1 }, cb, should_forget_first);

    const subscribeWebsiteStatus = (cb) =>
        SubscriptionManager.subscribe('website_status', { website_status: 1, subscribe: 1 }, cb);

    // ----- SmartCharts calls -----
    const subscribeTicksHistory = (request_object, cb, should_forget_first) =>
        SubscriptionManager.subscribe('ticks_history', request_object, cb, should_forget_first);

    const sendRequest = (request_object) => (
        Promise.resolve(
            !isEmptyObject(request_object) ?
                BinarySocket.send(request_object) :
                {}
        )
    );

    return {
        activeSymbols,
        buy,
        contractsFor,
        getAccountStatus,
        getSelfExclusion,
        getSettings,
        landingCompany,
        logout,
        mt5LoginList,
        payoutCurrencies,
        statement,

        // streams
        forget,
        forgetAll,
        sendRequest,
        subscribeBalance,
        subscribeProposal,
        subscribeTicks,
        subscribeTicksHistory,
        subscribeWebsiteStatus,
    };
})();

export default DAO;

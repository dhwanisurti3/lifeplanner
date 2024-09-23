import { createStore } from "vuex";

export default createStore({
    state: {
        sections: [],
        selectedSectionId: null,
    },
    getters: {
        sections(state) {
            return state.sections;
        },
    },
    mutations: {
        SET_SECTIONS(state, sections) {
            state.sections = sections;
        },
        ADD_SECTION(state, section) {
            state.sections.push(section);
        },
        REMOVE_SECTION(state, sectionId) {
            state.sections = state.sections.filter(
                (section) => section.id !== sectionId
            );
        },
        SET_SELECTED_SECTION(state, sectionId) {
            state.selectedSectionId = sectionId;
        },
        ADD_ITEM_TO_SECTION(state, { sectionId, newItem }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                section.items.push(newItem);
            }
        },
        REMOVE_ITEM_FROM_SECTION(state, { sectionId, itemId }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                section.items = section.items.filter(
                    (item) => item.id !== itemId
                );
            }
        },
    },
    actions: {
        async fetchSections({ commit }) {
            try {
                const response = await fetch("http://localhost:3000/sections");
                const data = await response.json();
                commit("SET_SECTIONS", data);
            } catch (error) {
                console.error("Failed to fetch sections:", error);
            }
        },
        async addSection({ commit }, newSection) {
            try {
                const response = await fetch("http://localhost:3000/sections", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newSection),
                });
                const data = await response.json();
                commit("ADD_SECTION", data);
            } catch (error) {
                console.error("Failed to add section:", error);
            }
        },
        async removeSection({ commit }, sectionId) {
            try {
                await fetch(`http://localhost:3000/sections/${sectionId}`, {
                    method: "DELETE",
                });
                commit("REMOVE_SECTION", sectionId);
            } catch (error) {
                console.error("Failed to remove section:", error);
            }
        },
        async addItemToSection({ commit, state }, { sectionId, newItem }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                try {
                    section.items.push(newItem);

                    await fetch(`http://localhost:3000/sections/${sectionId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items: section.items }),
                    });
                    commit("ADD_ITEM_TO_SECTION", { sectionId, newItem });
                } catch (error) {
                    console.error("Failed to add item:", error);
                }
            }
        },
        async removeItemFromSection({ commit, state }, { sectionId, itemId }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                section.items = section.items.filter(
                    (item) => item.id !== itemId
                );

                try {
                    await fetch(`http://localhost:3000/sections/${sectionId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items: section.items }),
                    });

                    commit("SET_SECTIONS", state.sections);
                } catch (error) {
                    console.error("Failed to remove item:", error);
                }
            }
        },
        selectSection({ commit }, sectionId) {
            commit("SET_SELECTED_SECTION", sectionId);
        },
    },
});

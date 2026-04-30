<template>
    <div class="ui-v1-logic-tree-node-item">
        <slot name="headline">
            <span
                v-if="$slots.title || $slots.trailing"
                class="ui-v1-logic-tree-node-item__headline"
            >
                <span
                    v-if="$slots.title"
                    class="ui-v1-logic-tree-node-item__title"
                >
                    <slot name="title" />
                </span>

                <slot name="trailing" />
            </span>
        </slot>

        <slot />
    </div>
</template>

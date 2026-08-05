<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Product } from '@/types/products';
import { PRODUCT_CATEGORIES } from '@/domain/categories';

const props = defineProps<{
    isOpen: boolean;
    productToEdit?: Product | null;
}>();

// Emits tipados con unión discriminada: el padre ya no necesita
// adivinar si es alta o edición inspeccionando `'id' in productData`.
const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'create', product: Omit<Product, 'id'>): void;
    (e: 'update', product: Product): void;
}>();

const categories = PRODUCT_CATEGORIES;

const formData = ref<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: 'Abarrotes',
    stock: 0,
});

// Cargar datos si estamos en modo edición
watch(
    () => props.productToEdit,
    (newVal) => {
        if (newVal) {
            formData.value = { ...newVal };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

function resetForm() {
    formData.value = {
        name: '',
        price: 0,
        category: 'Abarrotes',
        stock: 0,

    };
}

function handleSubmit() {
    if (!formData.value.name.trim() || formData.value.price <= 0) {
        alert('Por favor ingresa un nombre válido y un precio mayor a 0.');
        return;
    }

    if (props.productToEdit) {
        emit('update', { ...formData.value, id: props.productToEdit.id });
    } else {
        emit('create', formData.value);
    }

    emit('close');
}
</script>

<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-card">
            <h2>{{ productToEdit ? 'Editar Producto' : 'Nuevo Producto' }}</h2>

            <form @submit.prevent="handleSubmit" class="form-body">
                <label>
                    Nombre del producto
                    <input v-model="formData.name" type="text" placeholder="Ej. Arroz 1kg" required />
                </label>

                <div class="form-row">
                    <label>
                        Precio (S/)
                        <input v-model.number="formData.price" type="number" step="0.10" min="0" required />
                    </label>

                    <label>
                        Stock inicial
                        <input v-model.number="formData.stock" type="number" min="0" required />
                    </label>
                </div>

                <label>
                    Categoría
                    <select v-model="formData.category">
                        <option v-for="cat in categories" :key="cat" :value="cat">
                            {{ cat }}
                        </option>
                    </select>
                </label>



                <div class="modal-actions">
                    <button type="button" class="btn-cancel" @click="emit('close')">Cancelar</button>
                    <button type="submit" class="btn-save">
                        {{ productToEdit ? 'Guardar Cambios' : 'Crear Producto' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 16px;
}

.modal-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.modal-card h2 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #0f172a;
}

.form-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

label {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    gap: 4px;
}

input,
select {
    padding: 10px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
}

input:focus,
select:focus {
    border-color: #2563eb;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
}

.btn-cancel {
    background: #f1f5f9;
    color: #475569;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}

.btn-save {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}
</style>
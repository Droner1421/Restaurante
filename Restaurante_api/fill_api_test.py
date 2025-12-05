import requests
import random
from datetime import datetime, timedelta

API_URL = 'http://localhost:3000/api/restaurante-pedidos'

restaurantes = []
for i in range(5):
    data = {
        'nombre': f'Test Restaurante {i+1}',
        'direccion': f'Avenida {i+1} #456',
        'telefono': f'555111{i:03d}',
        'horario': '09:00-21:00',
        'capacidad': random.randint(30, 80),
        'gerente': f'Gerente Test {i+1}'
    }
    r = requests.post(f'{API_URL}/restaurantes', json=data)
    try:
        r.raise_for_status()
        res = r.json()
        print(f'Restaurante creado: {res}')
        rid = res.get('id_restaurante') or res.get('id')
        if rid:
            restaurantes.append(rid)
        else:
            print(f'Advertencia: No se encontró id_restaurante en la respuesta {res}')
    except Exception as e:
        print(f'Error creando restaurante {i+1}:', r.text)

if not restaurantes:
    print('No se pudieron crear restaurantes. El script se detiene.')
    exit(1)

# Hasta aquí 5 registros

# Crear 10 platillos (total acumulado 15)
categorias = ['Entrada', 'Plato Principal', 'Postre', 'Bebida']
platillos = []
for i in range(10):
    restaurante_id = random.choice(restaurantes)
    data = {
        'id_restaurante': restaurante_id,
        'nombre': f'Test Platillo {i+1}',
        'descripcion': f'Descripción del test platillo {i+1}',
        'categoria': random.choice(categorias),
        'precio': round(random.uniform(40, 250), 2),
        'disponible': random.choice([True, False])
    }
    r = requests.post(f'{API_URL}/platillos', json=data)
    try:
        r.raise_for_status()
        res = r.json()
        print(f'Platillo creado: {res}')
        pid = res.get('id_platillo') or res.get('id')
        if pid:
            platillos.append(pid)
        else:
            print(f'Advertencia: No se encontró id_platillo en la respuesta {res}')
    except Exception as e:
        print(f'Error creando platillo {i+1}:', r.text)

metodos_pago = ['Efectivo', 'Tarjeta', 'Transferencia']
for i in range(5):
    fecha = (datetime.now() - timedelta(days=random.randint(0, 10))).strftime('%Y-%m-%d')
    data = {
        'id_restaurante': random.choice(restaurantes),
        'fecha': fecha,
        'hora': f'{random.randint(14,20)}:{random.choice(["00","30"])}',
        'mesa': str(random.randint(5, 25)),
        'total': round(random.uniform(150, 800), 2),
        'metodo_pago': random.choice(metodos_pago),
        'estatus': random.choice(['pendiente', 'pagado', 'cancelado'])
    }
    r = requests.post(f'{API_URL}/pedidos', json=data)
    try:
        r.raise_for_status()
        res = r.json()
        print(f'Pedido creado: {res}')
    except Exception as e:
        print(f'Error creando pedido {i+1}:', r.text)

print('20 datos de prueba adicionales enviados a la API.')

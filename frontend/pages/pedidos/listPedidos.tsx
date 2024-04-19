import { Box, Chip, Divider, Typography } from '@mui/material'
import { NextPage } from 'next'
import styles from '../../styles/pedidos/ListPedidos.module.css'
import useGetPedido from './services/useGetPedido'
import PaidIcon from '@mui/icons-material/Paid';

const ListPedido: NextPage = () => {
   const { data: dataPedido, statusQuery } = useGetPedido()

   return (
      <Box className={styles.pedidoContainer}>
         <Box className={styles.card}>
            <Typography variant="h5">Meu Pedido</Typography>
            <Box sx={{ pt: '24px' }}>
               {dataPedido &&
                  dataPedido.map((item: any) => (
                     <Box key={item.id} className={styles.pedidoCard}>
                        
                        <Chip
                           label={item.numero_mesa}
                           color="primary"
                           sx={{ width: '100px' }}
                        />
                        <Typography variant="body1">
                           Nome:{item.nome_cliente}
                        </Typography>
                        <Typography variant="body1">
                           Status:{item.status_pedido}
                        </Typography>
                        <Typography variant="body1">
                           Hora pedido:{item.data_pedido}
                        </Typography>
                        <Typography variant="body1">
                           Previsão:{item.hora_estimada_pedido}
                        </Typography>
                        <Box className={styles.pedidoItens}>
                           {item.itens_pedido?.map((item: any) => (
                              <>
                                 <Typography variant="body1">
                                 {item.nome}
                                 </Typography>
                                 <Typography variant="body1">
                                    <PaidIcon
                                       fontSize="small"
                                       sx={{ mb: '-4px' }}
                                    />
                                    : {item.preco}
                                 </Typography>
                                 <Divider />
                              </>
                           ))}
                        </Box>
                     </Box>
                  ))}
            </Box>
         </Box>
      </Box>
   )
}

export default ListPedido

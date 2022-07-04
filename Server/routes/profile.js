const express = require('express')
import {createInvoice, updateInvoice, deleteInvoice, getInvoice, getInvoicesByUser, getTotalCount} from '../controllers/invoices.js'

const router = express.Router()

router.get('/count', getTotalCount) //for generating invoice serial number
router.get('/id:', getInvoice)
router.get('/', getInvoicesByUser)
router.post('/', createInvoice)
router.patch('/:id', updateInvoice)
router.delete('/:id', deleteInvoice)

export default router
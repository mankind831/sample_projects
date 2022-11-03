import _ from 'lodash'
import { decodeToken, generateToken, checkSlot, computeBill } from '../src/util/config'


test('Token Generation and Decoding', async () => {
    const getToken = await generateToken({list:'Data'})
    expect(await decodeToken(getToken)).toStrictEqual({list:'Data'})
})

test('CheckSlot Function', async () => {
    expect(await checkSlot('Small Vehicle','B')).toStrictEqual({gateway:'B',slot:'01'})
})

test('computBill Function', async () => {
    expect(await computeBill('Small Vehicle','11/03/2022 01:00 PM','11/03/2022 03:00 PM')).toBe('40')
})
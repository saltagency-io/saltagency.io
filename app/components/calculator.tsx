import * as React from 'react'

import clsx from 'clsx'

import { Select } from '~/components/form-elements'
import { Grid } from '~/components/grid'
import { useLabels } from '~/utils/labels-provider'

const numberFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const Divider = () => (
  <>
    <tr className="h-4" />
    <tr className="h-0">
      <td className="border-t border-solid border-white" />
      <td className="border-t border-solid border-white" />
    </tr>
    <tr className="h-4" />
  </>
)

const Row = ({
  label,
  value,
  negativeValue = false,
}: {
  label: string
  value: number
  negativeValue?: boolean
}) => (
  <tr className="h-8 text-white">
    <td>{label}</td>
    <td className="text-right">
      {negativeValue ? '-' : ''} {numberFormatter.format(value)}
    </td>
  </tr>
)

const OptionalRow = ({
  label,
  value,
  isChecked,
  onClick,
}: {
  label: string
  value: number
  isChecked: boolean
  onClick: () => void
}) => (
  <tr
    className="h-8 cursor-pointer text-white hover:bg-gray-700"
    onClick={onClick}
  >
    <td>
      <input
        className="pointer-events-none mr-2 align-middle"
        type="checkbox"
        checked={isChecked}
        readOnly
      />
      <span
        className={clsx('align-middle', {
          'line-through': !isChecked,
        })}
      >
        {label}
      </span>
    </td>
    <td className="text-right">- {numberFormatter.format(value)}</td>
  </tr>
)

const RATES = [80, 90, 100, 110, 120, 130, 140, 150]
const yearlyBaseSalary = 61586
const yearlyBonusRatio = 0.55

export function Calculator() {
  const { t } = useLabels()

  const [rate, setRate] = React.useState(RATES[2])
  const [usesTraining, setUsesTraining] = React.useState(true)
  const [usesEquipment, setUsesEquipment] = React.useState(true)

  const trainingBudget = usesTraining ? 1000 : 0
  const equipment = usesEquipment ? 2000 : 0

  const annualRevenue = rate * 8 * (260 - 40)
  const relativeRevenue = annualRevenue * 0.7
  const baseMonthlySalary = yearlyBaseSalary / 12
  const baseYearlyBonus =
    relativeRevenue * yearlyBonusRatio >= yearlyBaseSalary
      ? relativeRevenue * yearlyBonusRatio - yearlyBaseSalary
      : 0
  const baseMonthlyBonus = baseYearlyBonus > 0 ? baseYearlyBonus / 12 : 0
  const employerCharges = relativeRevenue * 0.18
  const yearlyBonus =
    relativeRevenue -
    yearlyBaseSalary -
    baseYearlyBonus -
    employerCharges -
    trainingBudget -
    equipment
  const monthlyPaycheck = baseMonthlySalary + baseMonthlyBonus
  const yearlyPay = monthlyPaycheck * 12 + yearlyBonus

  return (
    <Grid className="mb-8">
      <div className="col-span-full">
        <Select
          className="max-w-[170px] text-white"
          label={t('calculator.rate')}
          name="rate"
          defaultValue={String(rate)}
          onChange={(event) => setRate(Number(event.target.value))}
        >
          {RATES.map((rateValue) => (
            <option key={rateValue} value={String(rateValue)}>
              {numberFormatter.format(rateValue)}
            </option>
          ))}
        </Select>
      </div>
      <table className="col-span-4 md:col-span-8 lg:col-span-4">
        <tbody>
          <Row label={t('calculator.revenue.annual')} value={annualRevenue} />
          <Row
            label={t('calculator.revenue.relative')}
            value={relativeRevenue}
          />
          <Divider />
          <Row
            label={t('calculator.costs.employer')}
            value={employerCharges}
            negativeValue
          />
          <OptionalRow
            label={t('calculator.costs.development')}
            value={trainingBudget}
            isChecked={usesTraining}
            onClick={() => setUsesTraining(!usesTraining)}
          />
          <OptionalRow
            label={t('calculator.costs.equipment')}
            value={equipment}
            isChecked={usesEquipment}
            onClick={() => setUsesEquipment(!usesEquipment)}
          />
          <Divider />
          <Row label={t('calculator.bonus')} value={yearlyBonus} />
          <Row label={t('calculator.paycheck')} value={monthlyPaycheck} />
          <Row label={t('calculator.total')} value={yearlyPay} />
        </tbody>
      </table>
    </Grid>
  )
}
